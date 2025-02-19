const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [3, "Minimum 3 characters"],
      maxlength: [1000, "Maximum 1000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumPost",
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
// Indexes
CommentSchema.index({ post: 1 });
CommentSchema.index({ parentComment: 1 });
CommentSchema.index({ createdAt: -1 });

// Virtuals
CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

CommentSchema.virtual("upvoteCount").get(function () {
  return this.upvotes.length;
});

// Middleware to update updatedAt
CommentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);
