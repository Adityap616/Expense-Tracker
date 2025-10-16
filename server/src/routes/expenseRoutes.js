import express from "express";
import { addExpense,getExpenses,removeExpense } from "../controllers/expenseController.js";
const router = express.Router();

router.get("/", getExpenses);
router.post("/", addExpense);
router.delete("/:id", removeExpense);

export default router;