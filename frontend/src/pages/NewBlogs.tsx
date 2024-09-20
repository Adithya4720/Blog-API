import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";

export const NewBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [references, setReferences] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/signin");
    }, 2000); 
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
        {
          title: title,
          content: body,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Blog published successfully");
        toast.success("Blog published successfully");
       
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      }
    } catch (e) {
      console.error("Blog publish error: ", e);
      toast.error("Error publishing blog");
    }
  };

  const handleSave = () => {
    console.log("Saving blog as draft:", { title, body, references });
    toast.success("Blog saved as draft");
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Write a New Blog</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="relative p-6 mt-8 bg-white rounded shadow-lg">
      <Toaster />
        <RxCross2
          className="absolute w-6 h-6 text-gray-700 cursor-pointer right-6 top-6"
          onClick={handleCancel}
        />
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-40 p-2 border border-gray-300 rounded"
            placeholder="Write your blog here"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            References
          </label>
          <textarea
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            className="w-full h-20 p-2 border border-gray-300 rounded"
            placeholder="Add references"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save as Draft
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
