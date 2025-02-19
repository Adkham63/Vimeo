import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import moment from "moment";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData } = await axios.get(`/api/forum/posts/${id}`);
        const { data: commentsData } = await axios.get(
          `/api/forum/posts/${id}/comments`
        );

        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      const { data } = await axios.post(
        `/api/forum/posts/${id}/comments`,
        { content: newComment },
        { withCredentials: true } // Добавьте эту опцию
      );

      setComments([...comments, data]);
      setNewComment("");
    } catch (error) {
      console.error("Comment submission failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      alert(error.response?.data?.error || "Failed to post comment");
    }
  };

  const handleUpvote = async () => {
    if (!user) return;
    try {
      const { data } = await axios.post(`/api/forum/posts/${id}/upvote`);
      setPost({ ...post, upvotes: data.upvotes });
    } catch (error) {
      console.error("Upvote failed:", error);
    }
  };

  if (loading) return <div className="text-center p-8">Loading post...</div>;
  if (!post) return <div className="text-center p-8">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link
                to={`/user/${post.author._id}`}
                className="font-medium hover:text-blue-600"
              >
                {post.author.name}
              </Link>
              <span>•</span>
              <span>{moment(post.createdAt).fromNow()}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
              post.upvotes.includes(user?._id)
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span>▲</span>
            {post.upvotes.length}
          </button>
        </div>

        <div className="prose max-w-none mb-8">{post.content}</div>

        <section className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">
            Comments ({comments.length})
          </h2>

          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border rounded-lg mb-2"
                rows="3"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Post Comment
              </button>
            </form>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

const Comment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { user } = useUser();

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!user || !replyContent.trim()) return;

    try {
      const { data } = await axios.post(
        `/api/forum/posts/${comment.post}/comments`,
        {
          content: replyContent,
          parentComment: comment._id,
        }
      );

      // Update comments state here
      setShowReply(false);
      setReplyContent("");
    } catch (error) {
      console.error("Reply submission failed:", error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-gray-800">{comment.content}</p>

          {user && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-blue-600 text-sm mt-2 hover:text-blue-700"
            >
              Reply
            </button>
          )}

          {showReply && (
            <form onSubmit={handleReplySubmit} className="mt-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="w-full p-2 border rounded-lg mb-2"
                rows="2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  Post Reply
                </button>
                <button
                  type="button"
                  onClick={() => setShowReply(false)}
                  className="bg-gray-200 px-3 py-1 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {comment.replies &&
            comment.replies.map((reply) => (
              <Comment key={reply._id} comment={reply} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
