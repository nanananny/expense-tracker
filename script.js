const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += Number(exp.amount);

    expenseList.innerHTML += `
      <li>
        ${exp.name} - ₹${exp.amount} (${exp.category})
        <button onclick="deleteExpense(${index})">X</button>
      </li>
    `;
  });

  totalEl.textContent = total;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (!name || !amount) return;

  expenses.push({ name, amount, category });
  updateUI();
  form.reset();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

updateUI();
