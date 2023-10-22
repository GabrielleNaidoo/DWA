import { createStore } from "redux";

// Define initial state:
const intialState = { count: 0 };

// Define actions
const addAction = () => ({
  type: "ADD",
});
const subtractAction = () => ({
  type: "SUBTRACT",
});
const resetAction = () => ({
  type: "RESET",
});

// Define reducer:
const tallyCountReducer = (state = intialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "ADD":
      return (state.count += 1);
    case "SUBTRACT":
      return (state.count -= 1);
    case "RESET":
      return (state.count = 0);
    default:
      return state;
  }
};

// create Redux store:
let store = createStore(tallyCountReducer);

//subscribe store changes:
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch actions to update store:
store.dispatch({ type: "ADD" });
