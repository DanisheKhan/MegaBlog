import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          placeholder="ENTER TITLE"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          placeholder="SLUG"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
      </div>
      <div className="w-1/3 px-2">
        <label className="flex mb-4 items-center justify-center gap-2 w-full cursor-pointer postCard py-2">
          <FaUpload />
          <span>{watch("image")?.[0]?.name || "UPLOAD IMAGE"}</span>
          <input
            type="file"
            className="hidden "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        </label>

        <Select
          options={["ACTIVE", "INACTIVE"]}
          label="STATUS"
          className="mb-4  postCard"
          value={watch("status")}
          {...register("status", { required: true })}
        />
      </div>
      <div className="w-full flex flex-col gap-3 items-center postCard">
        <div className="w-96 ">
          {post && (
            <div className="w-full">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <RTE
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full postCard cursor-pointer"
        >
          {post ? "UPDATE" : "SUBMIT"}
        </Button>
      </div>
    </form>
  );
}
