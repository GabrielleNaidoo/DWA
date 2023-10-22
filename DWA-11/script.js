const MAX_NUMBER = 10;
const MIN_NUMBER = -10;

const add = document.querySelector("[data-add]");
const subtract = document.querySelector("[data-subtract]");
const counter = document.querySelector("[data-counter]");
const reset = document.querySelector("[data-reset]");

const addHandler = () => {
  const newCount = parseInt(counter.dataset.counter) + 1;
  counter.dataset.counter = newCount;
  counter.innerText = newCount;

  if (subtract.disabled === true) {
    subtract.disabled = false;
  }
  if (newCount >= MAX_NUMBER) {
    add.disabled = true;
  }
};

const subtractHandler = () => {
  const newCount = parseInt(counter.dataset.counter) - 1;
  counter.dataset.counter = newCount;
  counter.innerText = newCount;

  if (add.disabled === true) {
    add.disabled = false;
  }

  if (newCount <= MIN_NUMBER) {
    subtract.disabled = true;
  }
};

const resetHandler = () => {
  counter.dataset.counter = 0;
  counter.innerText = counter.dataset.counter;
};

add.addEventListener("click", addHandler);
subtract.addEventListener("click", subtractHandler);
reset.addEventListener("click", resetHandler);
