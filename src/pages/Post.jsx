import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-screen  py-12">
      <Container>
        <div className="glass-container bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl shadow-purple-900/20">
          {/* Image Section */}
          <div className="relative group mb-8 overflow-hidden rounded-2xl aspect-video">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-invert max-w-none glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              {parse(post.content)}
            </div>

            {/* Author Actions */}
            {isAuthor && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to={`/edit-post/${post.$id}`} className="flex-1">
                  <Button className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all gap-2 flex justify-center items-center">
                    <FaEdit className="w-5 h-5" />
                    <span>Edit Post</span>
                  </Button>
                </Link>
                
                <Button 
                  onClick={deletePost}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all gap-2 sm:flex-1 flex justify-center items-center"
                >
                  <MdDelete className="w-5 h-5" />
                  <span>Delete Post</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}