import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Confetti from "react-confetti";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: { name: string };
}

export const AuthorBlogs: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin");
  }

  useEffect(() => {
    const fetch_data = async () => {
      const params = window.location.pathname.split("/");
      const blogId = params[params.length - 1];

      try {
        const response = await axios.get(
          "https://backend.hegdeadithyak.workers.dev/api/v1/blog/" + blogId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data", error);
      }
    };

    fetch_data();
  }, [navigate]);
  
  const handleLike = async (blogID: string) => {
    if (!hasLiked ) {
      setHasLiked(true);
      setHasDisliked(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    
      try {
        await axios.post(
          "http://localhost:8787/api/v1/blog/like",
          {
            postId: blogID,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error liking the blog:", error);
      }
    }
  };
  const handleDislike = () => {
    if (!hasDisliked) {
      setHasDisliked(true);
      setHasLiked(false);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      {blog ? (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            {blog.title}
          </h1>
          <div className="text-sm font-semibold text-gray-800">
            - Author: {blog.author.name}
          </div>
          <div className="text-sm font-medium text-gray-600 text-right mb-6">
            {blog.published ? (
              <span className="text-green-600">Published</span>
            ) : (
              <span className="text-red-600">Draft</span>
            )}
          </div>

          <div className="text-gray-700 text-lg leading-relaxed space-y-4">
            {blog.content
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="flex items-center space-x-4 mt-8 fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white p-4 rounded-lg shadow-md">
            <button
              onClick={
                () => handleLike(blog.id)
              }
              disabled={hasLiked}
              className={`px-4 py-2 rounded-full transition-all ${
                hasLiked ? "bg-blue-500" : "bg-gray-300"
              } text-white flex items-center space-x-2`}
            >
              <FaThumbsUp
                className={`transition-transform transform ${
                  hasLiked ? "scale-125" : ""
                }`}
              />
              <span>{hasLiked ? "Liked" : "Like"}</span>
            </button>
            <button
              onClick={handleDislike}
              disabled={hasDisliked}
              className={`px-4 py-2 rounded-full transition-all ${
                hasDisliked ? "bg-red-500" : "bg-gray-300"
              } text-white flex items-center space-x-2`}
            >
              <FaThumbsDown
                className={`transition-transform transform ${
                  hasDisliked ? "scale-125" : ""
                }`}
              />
              <span>{hasDisliked ? "Disliked" : "Dislike"}</span>
            </button>
          </div>

          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <div className="mb-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="bg-gray-100 p-4 mb-2 rounded-md">
                    {comment}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
            <textarea
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit Comment
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-medium text-gray-500">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};
