// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/todos`)
;
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post(`${process.env.REACT_APP_API_URL}/todos`, { text });
    setText("");
    fetchTodos();
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        placeholder="Enter your task"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
