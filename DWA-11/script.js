import { TallyCount, CountDisplay } from "./store.js";

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

/**************************************************************/
// from store.js

const tally = new TallyCount(); // create a 'Publisher'
const subscriber1 = new CountDisplay("sub1"); // create a 'Subscriber 1'
const subscriber2 = new CountDisplay("sub2"); // create a 'Subscriber 2'

tally.subscribe(subscriber1);
tally.subscribe(subscriber2);
tally.increment();
tally.increment();
tally.increment();
tally.unsubscribe(subscriber1);
tally.increment();
tally.decrement();
tally.reset();
