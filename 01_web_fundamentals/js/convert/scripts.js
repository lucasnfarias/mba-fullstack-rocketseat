const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

const form = document.querySelector("form");
const amountInput = document.getElementById("amount");
const currencyInput = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amountInput.addEventListener("input", () => {
  const hasCharsRegex = /\D+/g;
  amountInput.value = amountInput.value.replace(hasCharsRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();

  switch (currencyInput.value) {
    case "USD":
      convertCurrency(amountInput.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amountInput.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amountInput.value, GBP, "£");
      break;
  }
};

const convertCurrency = (amount, price, symbol) => {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    let total = amount * price;

    if (isNaN(total))
      return alert("Por favor, digite apenas números.");

    total = formatCurrencyBRL(total).replace("R$", "");

    result.textContent = `${total} Reais`;

    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    footer.classList.remove("show-result");
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

const formatCurrencyBRL = (value) => Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});