import { useState, useEffect } from "react";
import api from "../api";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "" });
  const [categories, setCategories] = useState([]); // store all categories
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    // fetch all expenses once, then extract unique categories
    const fetchCategories = async () => {
      try {
        const res = await api.get("/expenses");
        const unique = [...new Set(res.data.map((exp) => exp.category))];
        setCategories(unique);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryToUse =
      form.category === "new" ? newCategory.trim() : form.category;

    if (!categoryToUse) return alert("Please enter or select a category");

    const res = await api.post("/expenses", {
      ...form,
      category: categoryToUse,
    });

    onAdd(res.data);

    // Update category list dynamically
    if (!categories.includes(categoryToUse))
      setCategories((prev) => [...prev, categoryToUse]);

    // Reset form
    setForm({ title: "", amount: "", category: "" });
    setNewCategory("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option value="new">➕ Create New Category</option>
      </select>

      {form.category === "new" && (
        <input
          name="newCategory"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
      )}

      <button type="submit">Add Expense</button>
    </form>
  );
}
