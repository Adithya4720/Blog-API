import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ValidToken } from "../components/ValidToken";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
}

export const MyBlogs: React.FC = () => {
  ValidToken();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://backend.hegdeadithyak.workers.dev/api/v1/blog/myblogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBlogs(response.data.posts);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError("Failed to load blogs. Please try again.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncateContent = (content: string, lines: number) => {
    const contentLines = content.split("\n");
    if (contentLines.length > lines) {
      return contentLines.slice(0, lines).join("\n") + "...";
    }
    return content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div>
        
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/author-blogs/${blog.id}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl font-semibold text-gray-800">
                  {blog.title}
                </div>
                {blog.published ? (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Published
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                    Draft
                  </span>
                )}
              </div>
              <div className="text-gray-600 text-sm mb-4">
                {truncateContent(blog.content, 3)}
              </div>
              <div className="text-xs text-gray-500">
                Author: {blog.author.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600 font-medium">No blogs found.</p>
      )}
    </div>
    </div>
  );
};
