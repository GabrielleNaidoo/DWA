const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  try {
    result.innerText = Math.floor(dividend / divider);

    // no input for either or both
    if (dividend === "" || divider === "") {
      result.innerText = `Division not performed. Both values are required in inputs. Try again`;
    }

    // either or both of the inputted values are not numbers
    if (isNaN(dividend) || isNaN(divider)) {
      document.body.innerText = `Something critical went wrong. Please reload the page`;
      throw new Error("Your input is not a number");
    }

    // for either of the inputted values being negative
    if (dividend < 0 || divider < 0) {
      result.innerText = `Division not performed. Invalid number provided. Try again`;
      throw new Error(`Invalid number provided`);
    }
  } catch (error) {
    console.log(error.stack);
  }
});
