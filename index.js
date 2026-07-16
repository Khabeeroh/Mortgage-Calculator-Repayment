const form = document.getElementById("mortgage-form");
const mortgageAmountInput = document.getElementById("amount");
const mortgageTermInput = document.getElementById("mortgage-term");
const interestRateInput = document.getElementById("interest-rate");
const repaymentRadio = document.getElementById("repay");
const interestRadio = document.getElementById("interest");
const calculateBtn = document.getElementById("calculateRepayment");
const clearBtn = document.getElementById("clearBtn");
const mortgageAmountError = document.getElementById("amount-error");
const interestRateError = document.getElementById("interest-rate-error");
const mortgageTermError = document.getElementById("mortgage-term-error");
const mortgageTypeError = document.getElementById("mortgage-type-error");

const mortgageTypeOptions = document.querySelectorAll(
  'input[name="mortgage-type"]',
);
const displayResult = document.getElementById("result");


calculateBtn.addEventListener("click", () => {
  const mortgageAmountNum = mortgageAmountInput.value.trim();
  const mortgageAmount = Number(mortgageAmountNum.replace(/,/g, ""));
  const mortgageTerm = mortgageTermInput.value.trim();
  const interestRate = interestRateInput.value.trim();
 
  const hasSelectedMortgageType = Array.from(mortgageTypeOptions).some(
    (input) => input.checked,
  );

  if (mortgageAmount === "") {
    mortgageAmountError.textContent = "This field is required";
  }

  if (mortgageTerm === "") {
    mortgageTermError.textContent = "This field is required";
  }

  if (interestRate === "") {
    interestRateError.textContent = "This field is required";
  }

  if (!hasSelectedMortgageType) {
    mortgageTypeError.textContent = "This field is required";
  }

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = mortgageTerm * 12;

  const monthlyPayment =
    mortgageAmount *
    ((monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1));

  const totalRepayment = monthlyPayment * numberOfPayments;

  const formatNumber = (value) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const monthlyPaymentString = formatNumber(monthlyPayment);
  const totalRepaymentString = formatNumber(totalRepayment);

  displayResult.innerHTML = `
    <div class="display-result">
        <p class="text-white fs-5">Your results</p>
        <p class="pb-2 result-info"> Your results are shown below based on the information you provided. To adjust the results, edit the form and  click "calculate repayments" again.</p>

        <div class="card p-3">
            <p>Your monthly repayments</p>
            <h1 class="fs-1">£${monthlyPaymentString}</h1>
            <hr class="underline py-2">

            <p>Total you'll repay over the term</p>
            <h3 class="fs-5">£${totalRepaymentString}</h3>
        </div>
    </div>`;
});

clearBtn.addEventListener("click", () => {
  mortgageAmountInput.value = "";
  mortgageTermInput.value = "";
  interestRateInput.value = "";
  mortgageAmountError.textContent = "";
  mortgageTermError.textContent = "";
  interestRateError.textContent = "";
  mortgageTypeError.textContent = "";

  repaymentRadio.checked = false;
  interestRadio.checked = false;
});
