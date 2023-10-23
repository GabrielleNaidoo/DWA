export class TallyCount {
  constructor() {
    this.state = { count: 0 };
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // actions
  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }; // to take care of all properties. Remember that both destructured objects contain count variables, but the resulting object only has one because the latest one will override the older one.
    // newState method is called to destructure the current state into a new object, to prevent mutating the current object- a new object is created with the updated state
    this.notifyObservers();
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.state.count)); // console.log the new count value(this.count)
  }
}

// Update method
export class CountDisplay {
  constructor(name) {
    this.name = name;
  }

  update(newCount) {
    console.log(`Subscriber: ${this.name} Count: ${newCount}`);
  }
}
