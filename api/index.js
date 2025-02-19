const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const User = require("./models/User.js");
const Comment = require("./models/Comment");
const ForumPost = require("./models/ForumPost");
const Update = require("./models/Update");
require("dotenv").config();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
app.use(cookieParser()); //cookieParser

mongoose.connect(process.env.MONGO_URL);

// Test route
app.get("/test", (req, res) => {
  res.json("test ok");
});

// Registration route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.log("JWT error:", err);
            return res.status(500).json("JWT error");
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("Wrong password");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.json(null); // Возвращаем null вместо ошибки

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json(null);

    try {
      const user = await User.findById(userData.id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      res.status(500).json(null);
    }
  });
});

app.get("/api/updates", async (req, res) => {
  try {
    const updates = await Update.find()
      .populate("author", "name")
      .sort("-createdAt");
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single update
app.get("/api/updates/:id", async (req, res) => {
  try {
    const update = await Update.findById(req.params.id).populate(
      "author",
      "name"
    );
    res.json(update);
  } catch (error) {
    res.status(404).json({ message: "Update not found" });
  }
});

// Create new update (protected route)
app.post("/api/updates", async (req, res) => {
  try {
    const newUpdate = new Update({
      ...req.body,
      author: req.user?.id, // Requires authentication middleware
    });
    await newUpdate.save();
    res.status(201).json(newUpdate);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

// Add to POST /api/updates route
app.post("/api/updates", async (req, res) => {
  try {
    // Verify user is admin
    const user = await User.findById(req.user?.id);
    if (!user?.isAdmin) return res.status(403).json({ message: "Forbidden" });

    const newUpdate = new Update({
      ...req.body,
      author: req.user.id,
    });
    await newUpdate.save();
    res.status(201).json(newUpdate);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

app.get("/make-admin/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { isAdmin: true } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
});

// Add this before your other routes
app.get("/make-admin/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: { isAdmin: true } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: `${user.email} is now an admin`, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Forum Routes
// server.js
app.get("/api/forum/posts", async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate("author", "name")
      .populate("upvotes", "_id") // Добавьте эту строку
      .sort("-createdAt");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Добавьте в server.js перед роутами форума
const authenticate = async (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    try {
      const userData = await jwt.verify(token, jwtSecret);
      req.user = await User.findById(userData.id);
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};

// Обновите роут создания поста
app.post("/api/forum/posts", authenticate, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new ForumPost({
      title,
      content,
      tags,
      author: req.user.id, // Теперь будет корректный ID
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({
      error: error.message || "Invalid data",
      details: error.errors,
    });
  }
});

// Add this to server.js
app.delete("/api/forum/posts/:id", authenticate, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Find and delete the post
    const deletedPost = await ForumPost.findByIdAndDelete(req.params.id);
    
    // Also delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// server.js
app.post("/api/forum/posts/:id/comments", authenticate, async (req, res) => {
  try {
    const { content, parentComment } = req.body;
    const comment = new Comment({
      content,
      author: req.user.id, // Используем ID из аутентификации
      post: req.params.id,
      parentComment,
    });

    await comment.save();
    await ForumPost.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id },
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("author", "name")
      .populate("replies");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Comment error:", error);
    res.status(400).json({
      error: error.message || "Invalid data",
      details: error.errors,
    });
  }
});

app.post("/api/forum/posts/:id/upvote", authenticate, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user._id; // Используем ID из аутентификации
    const isUpvoted = post.upvotes.includes(userId);

    if (isUpvoted) {
      post.upvotes.pull(userId);
    } else {
      post.upvotes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Upvote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single post
app.get("/api/forum/posts/:id", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name",
        },
      });

    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get comments for a post
app.get("/api/forum/posts/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("author", "name")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "name",
        },
      });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// server.js
app.get("/api/forum/posts", async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate("author", "name email")
      .populate("upvotes", "_id") // Добавьте эту строку
      .sort("-createdAt");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE update endpoint (admin only)
app.delete("/api/updates/:id", authenticate, async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    // Find and delete the update by its id
    const deletedUpdate = await Update.findByIdAndDelete(req.params.id);
    
    if (!deletedUpdate) {
      return res.status(404).json({ message: "Update not found" });
    }
    
    res.json({ message: "Update deleted successfully" });
  } catch (error) {
    console.error("Error deleting update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Start the server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
