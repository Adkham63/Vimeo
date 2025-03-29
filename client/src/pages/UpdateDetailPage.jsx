import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateDetailPage = () => {
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const { data } = await axios.get(`/api/updates/${id}`);
        setUpdate(data);
      } catch (error) {
        console.error("Ошибка при получении обновления:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdate();
  }, [id]);

  if (loading)
    return <div className="text-center py-8">Uploading an article...</div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {update.featuredImage && (
        <img
          src={update.featuredImage}
          alt={update.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <div className="mb-6">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {update.category}
        </span>
        <span className="ml-3 text-gray-500 text-sm">
          {new Date(update.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{update.title}</h1>
      <div className="prose max-w-none">
        {update.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
      {update.author?.name && (
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-600">Written by {update.author.name}</p>
        </div>
      )}
    </article>
  );
};

export default UpdateDetailPage;
