import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUpload, FaPlus, FaSave } from "react-icons/fa";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    let dbPost;
    if (post) {
      const file =
        data.image && data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file =
        data.image && data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto px-4">
      <div className="glass-container bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl py-4 px-1 md:p-8 shadow-xl shadow-purple-900/20">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            {post ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-purple-100/80 mt-2 text-sm md:text-base">
            {post ? "Update your existing content" : "Share your ideas with the community"}
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <Input
                label="Title"
                id="title"
                placeholder="Enter post title"
                className={`glass-input focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition-all duration-200 ${
                  errors.title ? "border-red-400/50" : ""
                }`}
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title cannot exceed 100 characters",
                  },
                })}
              />
              {errors.title && (
                <span className="text-red-300 text-sm mt-1">{errors.title.message}</span>
              )}
            </div>

            <div>
              <Input
                label="Slug"
                id="slug"
                placeholder="Auto-generated slug"
                className={`glass-input focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition-all duration-200 ${
                  errors.slug ? "border-red-400/50" : ""
                }`}
                {...register("slug", {
                  required: "Slug is required",
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: "Slug can only contain lowercase letters, numbers, and hyphens",
                  },
                })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
                disabled
              />
              {errors.slug && (
                <span className="text-red-300 text-sm mt-1">{errors.slug.message}</span>
              )}
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="glass-upload flex flex-col items-center justify-center p-4 md:p-6 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-300/50 transition-colors cursor-pointer min-h-[200px]"
            >
              <FaUpload className="w-6 h-6 md:w-8 md:h-8 text-purple-200 mb-2" />
              <span className="text-center text-purple-100 text-sm md:text-base">
                {watch("image")?.[0]?.name || "Click to upload featured image"}
              </span>
              <input
                id="image"
                type="file"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                  required: !post && "Featured image is required",
                  validate: {
                    fileSize: (file) =>
                      file[0]?.size <= 5 * 1024 * 1024 || "File size must be less than 5MB",
                    fileType: (file) =>
                      ["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(
                        file[0]?.type
                      ) || "Only PNG, JPG, JPEG, and GIF files are allowed",
                  },
                })}
              />
            </label>
            {errors.image && (
              <span className="text-red-300 text-sm mt-2 block">{errors.image.message}</span>
            )}
          </div>
        </div>

        {/* Image Preview */}
        {post && (
          <div className="mb-6 md:mb-8">
            <div className="glass-panel p-2 rounded-xl border border-white/10">
              <h3 className="text-purple-200 mb-2 text-sm md:text-base font-medium">
                Current Featured Image
              </h3>
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full h-48 md:h-64 object-cover"
              />
            </div>
          </div>
        )}

        {/* Content Editor */}
        <div className="mb-6 md:mb-8">
          <div className="glass-panel md:p-4 rounded-xl border border-white/10">
            <RTE
              name="content"
              control={control}
              defaultValue={getValues("content")}
              className="min-h-[400px] md:min-h-[500px] text-purple-50"
              rules={{
                required: "Content is required",
                minLength: {
                  value: 100,
                  message: "Content must be at least 100 characters",
                },
              }}
            />
            {errors.content && (
              <span className="text-red-300 text-sm mt-2 block">{errors.content.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full md:w-1/2 py-3 md:py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all gap-2 font-semibold text-sm md:text-base"
          >
            {post ? (
              <div className="flex items-center justify-center gap-1">
                <FaSave className="w-4 h-4 md:w-5 md:h-5" />
                Update Post
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <FaPlus className="w-4 h-4 md:w-5 md:h-5" />
                Create Post
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}