import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Post() {
  const [post, setPost] = useState(null);
  const [parsedContent, setParsedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Centralized error handling
  const handleError = (error, redirect = "/") => {
    console.error(error);
    navigate(redirect);
  };
  useEffect(() => {
    if (!slug) return navigate("/");

    setLoading(true);
    appwriteService
      .getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post);
          // Lazy load HTML parsing
          import("html-react-parser").then(({ default: parse }) => {
            setParsedContent(parse(post.content));
            setLoading(false);
          });
        } else {
          handleError("Post not found");
        }
      })
      .catch((error) => handleError(error));
  }, [slug, navigate]);

  // Check if user is the author
  const isAuthor = useMemo(
    () => post && userData && post.userId === userData.$id,
    [post, userData]
  );

  // Function to delete the post
  const deletePost = async () => {
    if (!post) return;
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-container bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
          <Loader type="rings" text="Loading post..." />
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Container>
        <div className="glass-container bg-white/5  border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl shadow-purple-900/20">
          {/* Image Section */}
          <div className="relative group mb-6 md:mb-8 overflow-hidden rounded-2xl max-w-[25rem] sm:w-[80%] md:w-[70%] h-[15rem] sm:h-[20rem] mx-auto">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold  text-blue-300/70">
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none glass-panel  sm:p-3 md:p-4 lg:p-5 rounded-xl  ">
              {parsedContent}
            </div>

            {/* Author Actions */}
            {isAuthor && (
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
                <Link to={`/edit-post/${post.$id}`} className="flex-1">
                  <Button
                    className="w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all gap-2 flex justify-center items-center"
                    aria-label="Edit Post"
                  >
                    <FaEdit className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Edit Post</span>
                  </Button>
                </Link>

                <Button
                  onClick={deletePost}
                  className="w-full py-2.5 md:py-3.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all gap-2 sm:flex-1 flex justify-center items-center"
                  aria-label="Delete Post"
                >
                  <MdDelete className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Delete Post</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
