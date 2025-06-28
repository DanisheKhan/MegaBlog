import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // Handle image loading 
  const onImageError = (e) => {
    e.target.src = '/Images/b.jpg'; // Fallback image
    e.target.classList.add('image-error');
  };
  return (
    <Link to={`/post/${$id}`} className="block h-full fade-in">
      <div className="group relative h-full overflow-hidden rounded-xl hover-lift hover-scale transition-all duration-300">
        <div className="bg-[#182234]/80 border border-gray-700/30 rounded-xl p-4 h-full flex flex-col shadow-lg glass-container">
          {/* Image shimmer effect while loading */}
          <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] flex-grow bg-gray-800/30">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-effect"></div>

            {/* Actual image */}
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={onImageError}
              style={{
                contentVisibility: "auto",
                transform: "translateZ(0)",
                willChange: "transform"
              }}
            />

            {/* Gradient overlay with improved effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c1425]/90 via-[#0c1425]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Hover effect glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-blue-500/10 transition-opacity duration-500"></div>
          </div>

          {/* Title Section with animation */}
          <div className="mt-auto pb-1 transform translate-y-0 group-hover:translate-y-[-2px] transition-transform duration-300">
            <h2 className="text-lg font-semibold text-blue-50 group-hover:text-white px-1 relative">
              {title}
              <span className="absolute -bottom-1 left-1 h-[2px] w-0 bg-blue-400/60 group-hover:w-[80%] transition-all duration-300 ease-out"></span>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
