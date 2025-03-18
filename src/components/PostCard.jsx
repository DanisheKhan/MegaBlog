import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] h-full">
        <div className="glass-container bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 h-full min-h-[300px] flex flex-col">
          {/* Image Container - Reduced Height */}
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] flex-grow">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Title Section - Adjusted Positioning */}
          <div className="mt-auto pb-2">
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 px-2 group-hover:translate-x-2 transition-transform duration-300">
              {title}
            </h2>
          </div>

          {/* Hover Glow Effect */}
          {/* <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 mix-blend-overlay group-hover:border-white/20 transition-all duration-300" /> */}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;