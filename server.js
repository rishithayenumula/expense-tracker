const express = require("express");
const mongoose = require("mongoose");
const Expense = require("./models/Expense");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/expenseTracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes

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
  res.json({ message: "Expense deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
