const categoryEl = document.getElementById("category");
const titleEl = document.getElementById("title");
const amountEl = document.getElementById("amount");
const listEl = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

function fetchExpenses() {
  fetch("/expenses")
    .then(res => res.json())
    .then(data => {
      listEl.innerHTML = "";
      let total = 0;

      data.forEach(exp => {
        total += exp.amount;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        li.innerHTML = `
          <span>${exp.title} (${exp.category})</span>
          <span>
            ₹${exp.amount}
            <button onclick="deleteExpense('${exp._id}')" 
                    style="margin-left:10px; border:none; background:none; color:red; cursor:pointer;">
              ❌
            </button>
          </span>
        `;

        listEl.appendChild(li);
      });

      totalEl.innerText = total;
    });
}

function addExpense() {
  const category = categoryEl.value;
  const title = titleEl.value || category;
  const amount = Number(amountEl.value);

  if (!category || !amount) {
    alert("Select category and enter amount");
    return;
  }

  fetch("/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, title, amount })
  }).then(() => {
    titleEl.value = "";
    amountEl.value = "";
    fetchExpenses();
  });
}

function deleteExpense(id) {
  fetch(`/expenses/${id}`, { method: "DELETE" })
    .then(() => fetchExpenses());
}

// Load data on page load
fetchExpenses();
