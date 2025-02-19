const mongoose = require("mongoose");

const ForumPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [120, "Maximum 120 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Minimum 10 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Автор обязателен"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 5;
        },
        message: "Максимум 5 тегов",
      },
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true, // Автоматические createdAt и updatedAt
    toJSON: { virtuals: true }, // Включает виртуальные поля в JSON
  }
);

// Индексы
ForumPostSchema.index({ createdAt: -1 });
ForumPostSchema.index({ title: "text", content: "text" });

// Виртуальное поле
ForumPostSchema.virtual("upvotesCount").get(function () {
  return this.upvotes.length;
});

module.exports = mongoose.model("ForumPost", ForumPostSchema);
