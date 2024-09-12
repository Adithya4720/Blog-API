import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface blogs{
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
    author : { name: string };
}

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<blogs[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin");
  }

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8787/api/v1/blog/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data);
    } catch (e) {
      console.error("Blog fetch error: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const truncateContent = (content: string, lines: number) => {
    const contentLines = content.split("\n");
    if (contentLines.length > lines) {
      return contentLines.slice(0, lines).join("\n") + "...";
    }
    return content;
  };

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
        <div className="text-4xl font-bold text-gray-800 mb-6">Blogs</div>

        {loading ? (
            <div className="text-center text-lg font-medium text-gray-500">Loading blogs...</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
                            onClick={() => navigate(`/author-blogs/${blog.id}`)}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-semibold text-gray-800">{blog.title}</div>
                             
                                {blog.published ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                        Published
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                                        Unpublished
                                    </span>
                                )}
                            </div>
                            <div className="text-gray-600 text-sm mb-4">{truncateContent(blog.content, 3)}</div>
                            <div className="text-xs text-gray-500">Author: {blog.author.name}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-lg text-gray-600 font-medium col-span-full">
                        No blogs found.
                    </div>
                )}
            </div>
        )}
    </div>
);
};
