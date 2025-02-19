import React, { useState } from "react";
import axios from "axios";

const CreateUpdateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "news",
    featuredImage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/updates", formData);
      alert("Update published successfully!");
      setFormData({
        title: "",
        content: "",
        category: "news",
        featuredImage: "",
      });
    } catch (error) {
      console.error("Error publishing update:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Update</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full p-2 border rounded h-32"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="news">News</option>
            <option value="trends">Trends</option>
            <option value="tutorials">Tutorials</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Featured Image URL</label>
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) =>
              setFormData({ ...formData, featuredImage: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Publish Update
        </button>
      </form>
    </div>
  );
};

export default CreateUpdateForm;
