import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext.jsx";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/forum/posts",
        {
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        {
          withCredentials: true, // Добавьте эту опцию
        }
      );
      navigate("/forum");
    } catch (error) {
      console.error("Post creation failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      alert(
        `Error: ${error.response?.data?.error || "Не удалось создать запись"}`
      );
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Create a new post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block mb-2 font-medium">The title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            minLength="5"
            maxLength="120"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Minimum of 5 characters</p>
        </div>

        {/* Content Input */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-lg h-48"
            minLength="10"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Minimum of 10 characters</p>
        </div>

        {/* Tags Input */}
        <div>
          <label className="block mb-2 font-medium">
            Tags (separated by commas)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="for example, equipment, methods, workflow"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Create a post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
