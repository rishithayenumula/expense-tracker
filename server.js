const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/expenseTracker");

const Expense = mongoose.model("Expense", {
  category: String,
  title: String,
  amount: Number,
});

// Get all expenses
app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Add expense
app.post("/expenses", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// Delete expense
app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
