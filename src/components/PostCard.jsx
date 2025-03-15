import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="flex flex-col items-center justify-center gap-4 overflow-hidden">
        <div className="postCard">
          <div className="w-full justify-center mb-4">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl h-72 w-full object-cover object-center"
            />
          </div>
          <h2 className="text-white text-lg font-semibold ">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
