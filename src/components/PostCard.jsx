import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block h-full">      <div className="group relative h-full overflow-hidden rounded-2xl">
      <div className="bg-[#1e1e2e]/70 border border-gray-700/30 rounded-2xl p-4 h-full flex flex-col shadow-md">
        {/* Image Container with optimized dimensions */}
        <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] flex-grow">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{ contentVisibility: "auto" }}
          />
          {/* Gradient overlay using pseudo-element */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Title Section */}
        <div className="mt-auto pb-2">            <h2 className="text-lg font-semibold text-white hover:text-gray-200 px-2">
          {title}
        </h2>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default PostCard;
