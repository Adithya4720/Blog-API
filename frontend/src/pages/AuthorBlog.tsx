import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author : { name: string };
}

export const AuthorBlogs: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch_data = async () => {
      const params = window.location.pathname.split("/");
      const blogId = params[params.length - 1];
      const token = localStorage.getItem("token");
  
      if (!token) {
        navigate("/signin");
      }
  
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
  });

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
        {blog ? (
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                    {blog.title}
                </h1>
                <div className="text-sm font-semibold text-gray-800">
                    - Author : {blog.author.name}    
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
            </div>
        ) : (
            <div className="text-center text-lg font-medium text-gray-500">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )}
    </div>
);
};
