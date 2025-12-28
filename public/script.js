let total = 0;

function addExpense() {
    const category = document.getElementById("category").value;
    const titleInput = document.getElementById("title").value;
    const amount = Number(document.getElementById("amount").value);

    if (!category || !amount) {
        alert("Please select category and enter amount");
        return;
    }

    const title = titleInput ? titleInput : category;

    const li = document.createElement("li");
    li.innerHTML = `<span>${title}</span><span>₹${amount}</span>`;

    document.getElementById("expenseList").appendChild(li);

    total += amount;
    document.getElementById("total").innerText = total;

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
}
