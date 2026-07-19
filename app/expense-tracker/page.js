"use client";

import React, { useState } from "react";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");

  const addTransaction = () => {
    if (!name || !amount) return;

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        name,
        amount: Number(amount),
        type,
      },
    ]);

    setName("");
    setAmount("");
    setType("Expense");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h2>Income & Expense Tracker</h2>

      <h3>Balance: ${balance.toFixed(2)}</h3>

      <p style={{ color: "green" }}>Income: +${income.toFixed(2)}</p>
      <p style={{ color: "red" }}>Expense: -${expense.toFixed(2)}</p>

      <input
        type="text"
        placeholder="Description"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      >
        <option>Expense</option>
        <option>Income</option>
      </select>

      <button
        onClick={addTransaction}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      >
        Add Transaction
      </button>

      <h3>Transactions</h3>

      {transactions.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            marginBottom: 8,
            borderLeft:
              item.type === "Income"
                ? "6px solid green"
                : "6px solid red",
            border: "1px solid #ddd",
          }}
        >
          <span>
            {item.name} ({item.type})
          </span>

          <span
            style={{
              color: item.type === "Income" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {item.type === "Income" ? "+" : "-"}$
            {item.amount.toFixed(2)}
          </span>

          <button onClick={() => deleteTransaction(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}