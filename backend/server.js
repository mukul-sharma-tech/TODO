const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.listen(5000, () => console.log(`Backend running on port ${PORT}`));
