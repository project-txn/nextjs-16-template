"use client";

import { useState } from "react";

export function TodoList() {
  const [todoItems, setTodoItems] = useState([
    { text: "Buy milk", completed: false },
    { text: "Buy strawberries", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (index) => {
    setTodoItems((prev) =>
      prev.map((todo, i) =>
        i === index
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!newTodo.trim()) return;

    setTodoItems((prev) => [
      ...prev,
      {
        text: newTodo,
        completed: false,
      },
    ]);

    setNewTodo("");
  };

  return (
    <>
      <ul>
        {todoItems.map((todoItem, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={todoItem.completed}
                onChange={() => toggleTodo(index)}
              />
              <span
                style={{
                  marginLeft: "8px",
                  textDecoration: todoItem.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todoItem.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="New to-do"
          value={newTodo}
          onChange={(ev) => setNewTodo(ev.target.value)}
        />
        <button type="submit">Add to-do</button>
      </form>
    </>
  );
}