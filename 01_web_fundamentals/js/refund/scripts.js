const form = document.querySelector("form");
const expenseAmountInput = document.getElementById("amount");
const expenseNameInput = document.getElementById("expense");
const expenseCategoryInput = document.getElementById("category");

const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

expenseAmountInput.oninput = (e) => {
  let value = expenseAmountInput.value.replace(/\D/g, "");

  value = Number(value) / 100;

  expenseAmountInput.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRl",
  });
}

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    name: expenseNameInput.value,
    category_id: expenseCategoryInput.value,
    category_name:
      expenseCategoryInput.options[expenseCategoryInput.selectedIndex].text,
    amount: expenseAmountInput.value,
    created_at: new Date(),
  };

  addExpense(newExpense);
};

function addExpense(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.name;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    expenseInfo.append(expenseName, expenseCategory);

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const expenseRemoveIcon = document.createElement("img");
    expenseRemoveIcon.classList.add("remove-icon");
    expenseRemoveIcon.setAttribute("src", "img/remove.svg");
    expenseRemoveIcon.setAttribute("alt", "remover");

    expenseItem.append(
      expenseIcon,
      expenseInfo,
      expenseAmount,
      expenseRemoveIcon
    );

    expenseList.append(expenseItem);

    clearForm();
    updateExpenseTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista  de despesas.");
    console.error(error);
  }
}

function updateExpenseTotals() {
  try {
    const items = expenseList.children;

    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;

    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount");

      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(".", "")
        .replace(",", ".");

      value = parseFloat(value);

      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular. O valor não parece ser um número."
        );
      }

      total += Number(value);
    }

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
    expensesTotal.innerHTML = `<small>R$</small> ${total}`;
  } catch (error) {
    console.error(error);
    alert("Não foi possível atualizar os totais");
  }
}

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-icon")) {
    const selectedItem = event.target.closest(".expense");
    selectedItem.remove();

    updateExpenseTotals();
  }
});

function clearForm() {
  expenseNameInput.value = "";
  expenseCategoryInput.value = "";
  expenseAmountInput.value = "";

  expenseNameInput.focus()
}
