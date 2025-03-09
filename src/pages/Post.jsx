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
    <div className="py-8">
      <Container>
        <div className="flex postCard ">
          <div className="flex-1">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-h-[30rem] border-r p-2"
            />
          </div>
          <div className="flex-1 ml-6">
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
        </div>

        <div className=" ">
          {isAuthor && (
            <div className="flex items-center justify-center mt-5">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3 hover:bg-green-600 transition hover:scale-105  postCard ">
                  <div className="flex items-center justify-center gap-3">
                    EDIT
                    <FaEdit />
                  </div>
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                className="hover:bg-red-600 transition hover:scale-105 postCard"
              >
                <div className="flex items-center justify-center gap-3">
                  DELETE
                  <MdDelete />
                </div>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
