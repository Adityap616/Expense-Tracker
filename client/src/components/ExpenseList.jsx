import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ExpenseList({ expenses, onDelete }) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedExpense) onDelete(selectedExpense._id);
    setShowModal(false);
    setSelectedExpense(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  if (expenses.length === 0)
    return <p className="no-expenses">No expenses recorded yet 💸</p>;

  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">Your Expenses</h2>
      <ul className="expense-list">
        {expenses.map((exp) => (
          <li key={exp._id} className="expense-card">
            <div className="expense-info">
              <h3 className="expense-title">{exp.title}</h3>
              <span className="expense-category">{exp.category}</span>
            </div>
            <div className="expense-amount">₹{exp.amount}</div>
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(exp)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Custom confirmation modal */}
      <ConfirmModal
        show={showModal}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedExpense?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
