import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext.jsx";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, ready } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/api/forum/posts");
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Ошибка при выборке сообщений:", error);
        alert("Не удалось загрузить сообщения");
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleUpvote = async (postId) => {
    if (!user) return;
    try {
      const { data } = await axios.post(
        `/api/forum/posts/${postId}/upvote`,
        {},
        { withCredentials: true }
      );

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, upvotes: data.upvotes } : post
        )
      );
    } catch (error) {
      alert(error.response?.data?.error || "Не удалось повысить голос");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот пост?")) return;

    try {
      await axios.delete(`/api/forum/posts/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post._id !== postId));
      alert("Сообщение успешно удалено");
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert(error.response?.data?.error || "Не удалось удалить запись");
    }
  };

  if (!ready) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (ready && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Форум сообщества</h1>
        {user?.isAdmin && (
          <Link
            to="/forum/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Новый пост
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center">Погрузочные посты...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">Постов пока нет</div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    to={`/forum/${post._id}`}
                    className="text-xl font-semibold hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>By {post.author?.name}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(post._id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                      post.upvotes?.some(
                        (uv) =>
                          (uv._id ? uv._id.toString() : uv.toString()) ===
                          user?._id
                      )
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <span>▲</span>
                    {post.upvotes?.length || 0}
                  </button>
                  {user?.isAdmin && (
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete post"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumPage;
