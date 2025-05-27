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
            // Set a small delay for loading to finish
            setTimeout(() => setLoading(false), 500);
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
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="glass-container bg-[#182234]/60 p-8 rounded-xl border border-blue-900/30 shadow-xl backdrop-blur-lg w-full max-w-2xl">
          <Loader type="rings" text="Loading post content..." />
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 page-transition">
      <Container>
        <div className="glass-container bg-[#182234]/80 border border-gray-700/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl"
          style={{ animation: "fadeIn 0.6s ease-out" }}>
          {/* Image Section */}
          <div className="relative group mb-6 md:mb-8 overflow-hidden rounded-xl max-w-[25rem] sm:w-[80%] md:w-[70%] h-[15rem] sm:h-[20rem] mx-auto shadow-lg hover-bright"
            style={{ animation: "fadeIn 0.8s ease-out" }}>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425]/70 via-transparent to-transparent" />
          </div>

          {/* Content Section */}          <div className="space-y-6 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-50"
              style={{ animation: "fadeIn 1s ease-out" }}>
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none glass-panel p-4 sm:p-5 md:p-6 lg:p-7 rounded-xl border border-gray-700/30 bg-[#0c1425]/30 shadow-inner"
              style={{ animation: "fadeIn 1.2s ease-out" }}>
              {parsedContent}
            </div>{/* Author Actions */}
            {isAuthor && (
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
                <Link to={`/edit-post/${post.$id}`} className="flex-1">
                  <Button
                    className="w-full py-2.5 md:py-3.5 bg-[#1e40af] hover:bg-[#1e3a8a] transition-all gap-2 flex justify-center items-center"
                    aria-label="Edit Post"
                  >
                    <FaEdit className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Edit Post</span>
                  </Button>
                </Link>
                <Button
                  onClick={deletePost}
                  className="w-full py-2.5 md:py-3.5 bg-red-800 hover:bg-red-900 transition-all gap-2 sm:flex-1 flex justify-center items-center"
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
