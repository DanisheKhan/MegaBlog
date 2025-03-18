import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUpload, FaPlus, FaSave, FaSpinner } from "react-icons/fa";

export default function PostForm({ post }) {
  const { register, handleSubmit, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const slugTransform = useCallback((value) => {
    return value
      ? value.trim().toLowerCase().replace(/[^a-z0-9\s]+/g, "-").replace(/\s/g, "-")
      : "";
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return null;
    try {
      return await appwriteService.uploadFile(file);
    } catch (err) {
      console.error("File upload error:", err);
      setError("Failed to upload image. Please try again.");
      return null;
    }
  };

  const submit = async (data) => {
    if (!userData?.$id) {
      setError("User data not available. Please re-login.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      let dbPost;
      const file = data.image?.[0] ? await handleFileUpload(data.image[0]) : null;
      
      if (post) {
        if (file) appwriteService.deleteFile(post.featuredImage);
        dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
      } else {
        dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file ? file.$id : "",
        });
      }

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } catch (e) {
      console.error("Error submitting post:", e);
      setError("An error occurred while saving the post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto px-4">
      <div className="glass-container bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl py-4 px-1 md:p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-center text-purple-300">
          {post ? "Edit Post" : "Create New Post"}
        </h1>
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Input
            label="Title"
            id="title"
            placeholder="Enter post title"
            className="glass-input"
            {...register("title", { required: "Title is required", minLength: 5, maxLength: 100 })}
          />
          <Input
            label="Slug"
            id="slug"
            placeholder="Auto-generated slug"
            className="glass-input text-gray-400"
            {...register("slug", { required: true })}
            onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
            disabled
          />
        </div>

        <label className="glass-upload cursor-pointer flex items-center justify-center p-4 border-2 border-dashed rounded-xl hover:border-purple-300 mt-6">
          <FaUpload className="text-purple-200" />
          <span className="ml-2 text-purple-100">Upload Featured Image</span>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        </label>
        {errors.image && <p className="text-red-400 text-sm">{errors.image.message}</p>}

        <RTE name="content" control={control} className="mt-6" />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold"
        >
          {isSubmitting ? <FaSpinner className="animate-spin" /> : post ? <FaSave /> : <FaPlus />} {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}