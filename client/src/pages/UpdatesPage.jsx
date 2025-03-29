import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext.jsx";

const UpdatesPage = () => {
  const [updates, setUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data } = await axios.get("/api/updates");
        setUpdates(data);
        setFilteredUpdates(data); // Initialize filtered updates with all updates
      } catch (error) {
        console.error("Ошибка при получении обновлений:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  // Filter updates based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUpdates(updates);
    } else {
      const filtered = updates.filter(
        (update) =>
          update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          update.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUpdates(filtered);
    }
  }, [searchTerm, updates]);

  const handleDelete = async (updateId) => {
    try {
      await axios.delete(`/api/updates/${updateId}`, { withCredentials: true });
      setUpdates((prevUpdates) =>
        prevUpdates.filter((update) => update._id !== updateId)
      );
      // No need to explicitly update filteredUpdates as the effect will handle it
    } catch (error) {
      console.error("Ошибка при удалении обновления:", error);
      alert("Failed to delete update");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading updates...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Industry updates</h1>

        <div className="relative w-full md:w-64 lg:w-96">
          <input
            type="text"
            placeholder="Search for updates..."
            className="w-full px-4 py-2.5 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 pr-10 bg-transparent transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {filteredUpdates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm
              ? "Ничего не найдено по вашему запросу"
              : "Нет доступных обновлений"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 hover:underline"
            >
              Сбросить поиск
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpdates.map((update) => (
            <article
              key={update._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
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
                <h2 className="text-xl font-semibold mb-2 min-h-[3.5rem]">
                  <Link
                    to={`/updates/${update._id}`}
                    className="hover:text-blue-600 line-clamp-2"
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
      )}
    </div>
  );
};

export default UpdatesPage;
