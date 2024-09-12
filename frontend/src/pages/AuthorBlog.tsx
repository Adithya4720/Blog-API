import axios from "axios";
import React, { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

export const AuthorBlogs: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);

  const fetch_data = async () => {
    const params = window.location.pathname.split("/");
    const authorId = params[params.length - 1];
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/signin";
    }

    try {
      const response = await axios.get(
        "http://localhost:8787/api/v1/blog/" + authorId,
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

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      {blog ? (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            {blog.title}
          </h1>
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
        </div>
      ) : (
        <div className="text-center text-lg font-medium text-gray-500">
          Loading blog...
        </div>
      )}
    </div>
  );
};
