import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaUser,
  FaClock,
  // FaComment,
} from "react-icons/fa";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: { name: string };
  createdAt: string;
}

export const AuthorBlogs: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Helper function to extract blogId from the URL
  const getBlogIdFromUrl = () => {
    const params = window.location.pathname.split("/");
    return params[params.length - 1];
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }

    const fetchBlogData = async () => {
      const blogId = getBlogIdFromUrl();

      try {
        const response = await axios.get(
          `https://backend.hegdeadithyak.workers.dev/api/v1/blog/${blogId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data", error);
      }
    };

    const checkLikeStatus = async () => {
      const blogId = getBlogIdFromUrl();
      try {
        const [likesResponse, alreadyLikedResponse] = await Promise.all([
          axios.post(
            "https://backend.hegdeadithyak.workers.dev/api/v1/blog/numlikes",
            { postId: blogId },
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.post(
            "https://backend.hegdeadithyak.workers.dev/api/v1/blog/alreadyliked",
            { postId: blogId },
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setLikes(likesResponse.data.likes);
        setHasLiked(alreadyLikedResponse.data);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchBlogData();
    checkLikeStatus();
  }, [navigate, token]);

  const handleLike = useCallback(async () => {
    if (!token || hasLiked) return;

    try {
      setHasLiked(true);
      setHasDisliked(false);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 3000);

      const blogId = getBlogIdFromUrl();
      await axios.post(
        "https://backend.hegdeadithyak.workers.dev/api/v1/blog/like",
        { postId: blogId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error liking the blog:", error);
      setHasLiked(false);
    }
  }, [token, hasLiked]);

  const handleDislike = useCallback(() => {
    if (!hasDisliked) {
      setHasDisliked(true);
      setHasLiked(false);
    }
  }, [hasDisliked]);

  // const handleCommentSubmit = useCallback(() => {
  //   if (comment.trim()) {
  //     setComments((prevComments) => [...prevComments, comment]);
  //     setComment("");
  //   }
  // }, [comment]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <motion.div
          className="bg-white p-4 rounded-full shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        <div className="px-6 py-8 sm:p-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            {blog.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center text-sm text-gray-600 mb-6"
          >
            <FaUser className="mr-2" />
            <span className="mr-4">{blog.author.name}</span>
            <FaClock className="mr-2" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span
              className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                blog.published
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {blog.published ? "Published" : "Draft"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="prose prose-lg max-w-none text-gray-700"
          >
            {blog.content
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex items-center justify-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              disabled={hasLiked}
              className={`px-6 py-2 rounded-full transition-all ${
                hasLiked
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              } flex items-center space-x-2`}
            >
              <FaThumbsUp
                className={`transition-transform ${
                  hasLiked ? "scale-125" : ""
                }`}
              />
              <span>{likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDislike}
              disabled={hasDisliked}
              className={`px-6 py-2 rounded-full transition-all ${
                hasDisliked
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-red-100"
              } flex items-center space-x-2`}
            >
              <FaThumbsDown
                className={`transition-transform ${
                  hasDisliked ? "scale-125" : ""
                }`}
              />
            </motion.button>
          </motion.div>

          {showConfetti && <Confetti recycle={false} />}
        </div>
      </motion.div>
    </div>
  );
};
