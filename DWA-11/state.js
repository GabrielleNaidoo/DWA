import { configureStore } from "@reduxjs/toolkit";

const intialState = { count: 0 };

const myReducer = (state = intialState, action) => {
  const newState = { ...state };
  if (action.type === "ADD") {
    newState.count += 1;
  }
  if (action.type === "SUBTRACT") {
    newState.count -= 1;
  }
  if (action.type === "RESET") {
    newState.count = 0;
  }

  return newState;
};

const store = configureStore(myReducer);
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "ADD" });
