import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext.jsx"; // Ensure this hook is correctly exported

const UpdatesPage = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data } = await axios.get("/api/updates");
        setUpdates(data);
      } catch (error) {
        console.error("Ошибка при получении обновлений:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const handleDelete = async (updateId) => {
    try {
      await axios.delete(`/api/updates/${updateId}`, { withCredentials: true });
      setUpdates((prevUpdates) =>
        prevUpdates.filter((update) => update._id !== updateId)
      );
    } catch (error) {
      console.error("Ошибка при удалении обновления:", error);
      alert("Failed to delete update");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка обновлений...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Отраслевые обновления
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updates.map((update) => (
          <article
            key={update._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {update.featuredImage && (
              <img
                src={update.featuredImage}
                alt={update.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {update.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(update.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/updates/${update._id}`}
                  className="hover:text-blue-600"
                >
                  {update.title}
                </Link>
              </h2>
              <p className="text-gray-600 line-clamp-3">{update.content}</p>
              {update.author?.name && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    От {update.author.name}
                  </span>
                </div>
              )}
              {/* Delete button visible only for admin */}
              {user?.isAdmin && (
                <button
                  onClick={() => handleDelete(update._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Удалить
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UpdatesPage;
