import { LitElement, html, css } from '../libs/lit.js';

class TallyApp extends LitElement {
  static properties = {
    count: { type: Number },
    isMin: { type: Boolean },
    isMax: { type: Boolean },
  };

  constructor() {
    super();
    this.count = 0;
    this.isMin = false;
    this.isMax = false;
  }

  increment() {
    if (this.count < 10) {
      this.count += 1;
      this.isMax = false;
    } else {
      this.isMax = true;
    }


    // const incrementState = {
    //   incrementCount: this.requestUpdate('count'),
    //   incrementIsMin: this.requestUpdate('isMin'),
    //   incrementIsMax: this.requestUpdate('isMax'),
    // }
    // console.log(incrementState);
    this.requestUpdate('count');
    this.requestUpdate('isMin');
    this.requestUpdate('isMax');

  }

  decrement() {
    if (this.count > -10) {
      this.count -= 1;
      this.isMin = false;
    } else {
      this.isMin = true;
    }

    // const decrementState = {
    //   decrementCount: this.requestUpdate('count'),
    //   decrementIsMin: this.requestUpdate('isMin'),
    //   decrementIsMax: this.requestUpdate('isMax'),
    // }
    // console.log(decrementState);

    this.requestUpdate('count');
    this.requestUpdate('isMin');
    this.requestUpdate('isMax');
  }
  reset() {
    this.count = 0;
    this.isMin = false;
    this.isMax = false;

    // const resetState = {
    //   resetCount: this.requestUpdate('count'),
    //   resetIsMin: this.requestUpdate('isMin'),
    //   resetIsMax: this.requestUpdate('isMax'),
    // }
    // console.log(resetState);
    this.requestUpdate('count');
    this.requestUpdate('isMin');
    this.requestUpdate('isMax');
  }

  static styles = css`
     :host{
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    .button{
      display:flex;
      align-items:center;
      justify-content:center;
      width:6rem;
    }

    .button_container{
      display:flex;
  
    }

  `;

  render() {
    return html` 
    <p class="counter">${this.count}</p>
      <div class="button_container" >
        <button class="button button__subtract" @click="${this.decrement}" ?disabled="${this.count === -10}">
          -
        </button>
        <button class="button button__add" @click="${this.increment}" ?disabled="${this.count === 10}">+</button>
        <button class="button reset__button" @click="${this.reset}">
          Reset
        </button>
        </div >`;

  }
}

customElements.define('tally-app', TallyApp);
