import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NewBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [references, setReferences] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handlePublish = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    const publish = async () => {
        try {
            const response = await axios.post(
            "http://localhost:8787/api/v1/blog/",
            {
                title : title,
                content : body,
                published: true
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            if (response.status === 200) {
            console.log("Blog published successfully");
            navigate("/");
            }
        } catch (e) {
            console.error("Blog publish error: ", e);
        }
    }
    publish();
    navigate("/");
  };

  const handleSave = () => {
    console.log("Saving blog as draft:", { title, body, references });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Write a New Blog</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-40"
            placeholder="Write your blog here"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            References
          </label>
          <textarea
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-20"
            placeholder="Add references"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save as Draft
          </button>
          <button
            onClick={handlePublish}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
