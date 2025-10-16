import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import api from "./api";
import "./App.css"; // ✅ ensure this is imported

export default function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, []);

  const handleAdd = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }; 

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="main-content">
        <div className="left-panel">
          <ExpenseForm onAdd={handleAdd} />
        </div>
        <div className="right-panel">
          <ExpenseList expenses={expenses}  onDelete={handleDelete}/>
        </div>
      </div>
    </div>
  );
}
