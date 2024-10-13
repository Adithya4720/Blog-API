import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XCircle } from "lucide-react";

export const NewBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [references, setReferences] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleLogout = () => {
    showAlert("Go Back", "success");
    setTimeout(() => navigate("/"), 2000);
  };

  const handlePublish = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend.hegdeadithyak.workers.dev/api/v1/blog",
        { title, content: body, published: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        showAlert("Blog published successfully", "success");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (e) {
      console.error(e);
      showAlert("Error publishing blog", "error");
    }
  };

  const handleSave = () => {
    console.log("Saving blog as draft:", { title, body, references });
    showAlert("Blog saved as draft", "success");
  };

  const showAlert = (message: string, type: string) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white animate-slideIn">Write a New Blog</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 animate-pulse"
          >
            Back
          </button>
        </div>

        {/* Blog Form */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fadeInSlow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">New Blog Post</h2>
              <XCircle
                className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-300 transform hover:rotate-90"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  placeholder="Enter blog title"
                />
              </div>
              {/* Body Input */}
              <div>
                <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-700">Body</label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40 transition duration-300"
                  placeholder="Write your blog here"
                ></textarea>
              </div>
              {/* References Input */}
              <div>
                <label htmlFor="references" className="block mb-2 text-sm font-medium text-gray-700">References</label>
                <textarea
                  id="references"
                  value={references}
                  onChange={(e) => setReferences(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 transition duration-300"
                  placeholder="Add references"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
            {/* Save Draft Button */}
            <button
              onClick={handleSave}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Save as Draft
            </button>
            {/* Publish Button */}
            <button
              onClick={handlePublish}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Publish
            </button>
          </div>
        </div>

        {/* Alert */}
        {alert.show && (
          <div 
            className={`mt-4 p-4 rounded-md shadow-md animate-fadeIn ${
              alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {alert.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewBlogs;
