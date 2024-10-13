import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClock } from "react-icons/fa";

interface Blog {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author: { name: string };
  createdAt: string; // Add this if available in your API response
}

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin");
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://backend.hegdeadithyak.workers.dev/api/v1/blog/posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogs(response.data);
      } catch (e) {
        console.error("Blog fetch error: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate, token]);

  const truncateContent = (content: string, words: number) => {
    const wordArray = content.split(' ');
    if (wordArray.length > words) {
      return wordArray.slice(0, words).join(' ') + '...';
    }
    return content;
  };

  return (
    <section className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                onClick={() => navigate(`/author-blogs/${blog.id}`)}
              >
                <div className="p-6">
                  <header className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {blog.title}
                      </h3>
                      {blog.published ? (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUser className="mr-2" />
                      <span>{blog.author.name}</span>
                      <FaClock className="ml-4 mr-2" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </header>
                  <div className="text-gray-600 mb-4 line-clamp-3">
                    {truncateContent(blog.content, 30)}
                  </div>
                  <footer className="text-right">
                    <button className="text-blue-500 hover:text-blue-700 font-semibold text-sm">
                      Read More
                    </button>
                  </footer>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-600 font-medium py-12">
              No blogs found. Be the first to create one!
            </div>
          )}
        </div>
      )}
    </section>
  );
};