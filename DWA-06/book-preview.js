// DWA09 Creating a web component:

export const template = document.createElement('template');
template.innerHTML = `
<style>
* {
  box-sizing: border-box;
}

.preview {
  border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
}

@media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

.preview:hover {
  background: rgba(var(--color-blue), 0.05);
}

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}

</style>
<button class="preview" data-preview >
<img
class="preview__image"
/>
<div class="preview__info">
<h3 class="preview__title"></h3>
<div class="preview__author"></div>
</div>
</button>`;

export class BookPreview extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' }); // creates the shadow DOM
    shadow.append(template.content.cloneNode(true)); // attaches the template tot he shadow DOM
    this.element = shadow.querySelector('[data-preview]'); // fetches elements from the shadow DOM
    this.imageElement = shadow.querySelector('.preview__image');
    this.titleElement = shadow.querySelector('.preview__title');
    this.authorElement = shadow.querySelector('.preview__author');
  }

  set image(image) {
    this.imageElement.src = image;
  }

  set title(title) {
    this.titleElement.textContent = title;
  }

  set author(author) {
    this.authorElement.textContent = author;
  }

  connectedCallback() {
    const id = this.getAttribute('data-preview');
  }
}

customElements.define('book-preview', BookPreview);

// By default, whatever you put inside your custom element is going to be considered inside your slot
// const template = document.createElement('template');
// template.innerHTML = `<style>h3{
//   color:green
// }</style>
// <h3><slot name="description"></slot></h3>`;

// class BookPreview extends HTMLElement {
//   constructor() {
//     super();
//     const shadow = this.attachShadow({ mode: 'open' }); // creates the shadow DOM
//     shadow.append(template.content.cloneNode(true)); // attaches the template to the shadow DOM

// --Use shadow.querySelector to add all the elements of the shadow DOM that you know you will be using
//   }
// }

// customElements.define('book-preview', BookPreview);

// You can use the slot element in your template, and give it a name attribute with a string value
// You can then use any type of element in your html w

// Lifecycle events:
/*

static get observedAttributes(){ -- observes the attribute that you want to track
  return ["attributeName"]
}


attributeChangeCallback(name,oldValue,newValue){
  console.log(name,oldValue,newValue) -- allows you to check which attributes of your custom element have changed
}
*/
