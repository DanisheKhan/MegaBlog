import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useState } from "react";

function PostCard({ $id, title, featuredImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl">
        <div className=" bg-white/5 border border-white/10 rounded-2xl p-4 h-full flex flex-col">
          {/* Image Container with optimized dimensions */}
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] flex-grow">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                console.log("Failed to load image:", featuredImage);
              }}
              style={{
                display: imageError ? 'none' : 'block'
              }}
            /> {imageError && (
              <div className="flex items-center justify-center h-40 bg-purple-800/40 rounded-xl">
                <span>Image not available</span>
              </div>
            )}
            {/* Gradient overlay using pseudo-element */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Title Section */}
          <div className="mt-auto pb-2">
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 px-2">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
