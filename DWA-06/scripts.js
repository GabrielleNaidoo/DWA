import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { BookPreview, template } from './book-preview.js';
let page = 1;
let matches = books;

// @ts-check

/**
 * The collection of DOM elements selected by their data attributes.
 *
 * @typedef {Object} HtmlElements
 * @property {Object} list - Contains elements related to the list of books.
 * @property {Object} search - Contains elements related to the search functionality.
 * @property {Object} settings - Contains elements related to the settings functionality.
 * @property {Object} other - Contains other elements that don't fall into a specific group.
 *
 */

/**
 * The object containing references to the DOM elements used throughout the code.
 * @type {HtmlElements}
 */
const html = {
  list: {
    items: document.querySelector('[data-list-items]'),
    overlay: document.querySelector('[data-list-active]'),
    close: document.querySelector('[data-list-close]'),
    blur: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    description: document.querySelector('[data-list-description]'),
  },
  search: {
    button: document.querySelector('[data-header-search]'),
    overlay: document.querySelector('[data-search-overlay]'),
    form: document.querySelector('[data-search-form]'),
    title: document.querySelector('[data-search-title]'),
    genres: document.querySelector('[data-search-genres]'),
    authors: document.querySelector('[data-search-authors]'),
    cancel: document.querySelector('[data-search-cancel]'),
  },
  settings: {
    button: document.querySelector('[data-header-settings]'),
    overlay: document.querySelector('[data-settings-overlay]'),
    form: document.querySelector('[data-settings-form]'),
    theme: document.querySelector('[data-settings-theme]'),
    cancel: document.querySelector('[data-settings-cancel]'),
  },
  other: {
    button: document.querySelector('[data-list-button]'),
    message: document.querySelector('[data-list-message]'),
  },
};

const starting = document.createDocumentFragment();

/**
 * Creates a book item based on the provided book data
 *
 * @param {Object} book - The object that provides the book data.
 * @param{string} book.author - The author of the book.
 * @param{string} book.id - The unique id of the book.
 * @param{string} book.image - The URL of the cover image for the book.
 * @param{string} book.title - The title of the book.
 * @returns{HTMLButtonElement} element - The element representing the book item with all of its associated properties.
 */

// DWA08: Turning createBookItem function into a factory function:

// const createBookItem = (book) => {
//   const { author, id, image, title } = book;
//   document.createElement('book-preview');

//   return {
//     author,
//     id,
//     image,
//     title,
//     createPreview() {
//       const element = document.createElement('button');
//       element.classList = 'preview';
//       element.setAttribute('data-preview', id);

//       element.innerHTML = `
//           <img
//               class="preview__image"
//               src="${image}"
//           />

//           <div class="preview__info">
//               <h3 class="preview__title">${title}</h3>
//               <div class="preview__author">${authors[author]}</div>
//           </div>
//       `;

//       return element;
//     },
//   };
// };

// For inital batch of books displayed on screen
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  // starting.appendChild(createBookItem(book).createPreview());
  const { author, title, id, image } = book;
  const bookPreview = document.createElement('book-preview');
  bookPreview.setAttribute('data-preview-custom', id);
  bookPreview.setAttribute('data-title', title);
  bookPreview.setAttribute('data-image', image);
  bookPreview.setAttribute('data-author', authors[author]);
  starting.appendChild(bookPreview);
}
html.list.items.appendChild(starting);

/**
 * Creates an HTML option element with the specified value and innerText - Used to create the first option elements for both Genre and Author.
 *
 * @param {string} value - The value that will be used for the option element.
 * @param {string} innerText - The text that will be displayed on the option element.
 * @returns{HTMLOptionElement} - The html option element that is created using the specified value and innerText properties.
 */
const createFirstOption = (value, innerText) => {
  const firstOption = document.createElement('option');
  firstOption.value = value;
  firstOption.innerText = innerText;
  return firstOption;
};

// Function to populate dropdown for both Authors and Genres:

/**
 * Creates HTML option elements to populate a dropdown menu with the provided object's id and name properties - Used to populate the dorpdown menus for both the genres and the authors.
 *
 *@param {Object} object - The object containing the properties "id" and "name" that are used to create the HTML option element.
 *@param {string} object.id - The value that the HTML option element's value attribute will be set to.
 *@param {string} object.name - The text that will be displayed on the HTML option element in the dropdown menu.
 *@returns {HTMLOptionElement}
 */
const populateDropdown = (object) => {
  const [id, name] = object;
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  return element;
};

// Genres:
const genreHtml = document.createDocumentFragment();
genreHtml.appendChild(createFirstOption('any', 'All Genres'));

for (const genre of Object.entries(genres)) {
  genreHtml.appendChild(populateDropdown(genre));
}

html.search.genres.appendChild(genreHtml);

// Authors:
const authorsHtml = document.createDocumentFragment();
authorsHtml.appendChild(createFirstOption('any', 'All Authors'));

for (const author of Object.entries(authors)) {
  authorsHtml.appendChild(populateDropdown(author));
}

html.search.authors.appendChild(authorsHtml);

html.other.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
html.other.button.disabled = matches.length - page * BOOKS_PER_PAGE > 0;

html.other.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

html.search.cancel.addEventListener('click', () => {
  html.search.overlay.open = false;
});

html.settings.cancel.addEventListener('click', () => {
  html.settings.overlay.open = false;
});

html.search.button.addEventListener('click', () => {
  html.search.overlay.open = true;
  html.search.title.focus();
});

html.settings.button.addEventListener('click', () => {
  html.settings.overlay.open = true;
});

html.list.close.addEventListener('click', () => {
  html.list.overlay.open = false;
});

/**
 * Represents the theme options for the different modes.
 * @typedef {Object} ThemeOptions
 * @property {Object} day - Theme options for day mode.
 * @property {string} day.dark - The dark mode color in RGB format-('10, 10, 20').
 * @property {string} day.light - The light mode color in RGB format-('255, 255, 255').
 * @property {Object} night - Theme options for night mode.
 * @property {string} night.dark - The dark mode color in RGB format-('255, 255, 255').
 * @property {string} night.light - The light mode color in RGB format-('10, 10, 20').
 */

/**
 * Theme options for the different color schemes in day and night modes.
 * @type {ThemeOptions}
 */

const themeOptions = {
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  },
};

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  html.settings.theme.value = 'night';
  document.documentElement.style.setProperty(
    '--color-dark',
    themeOptions.night.dark,
  );
  document.documentElement.style.setProperty(
    '--color-light',
    themeOptions.night.light,
  );
} else {
  html.settings.theme.value = 'day';
  document.documentElement.style.setProperty(
    '--color-dark',
    themeOptions.day.dark,
  );
  document.documentElement.style.setProperty(
    '--color-light',
    themeOptions.day.light,
  );
}

html.settings.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty(
      '--color-dark',
      themeOptions.night.dark,
    );
    document.documentElement.style.setProperty(
      '--color-light',
      themeOptions.night.light,
    );
  } else {
    document.documentElement.style.setProperty(
      '--color-dark',
      themeOptions.day.dark,
    );
    document.documentElement.style.setProperty(
      '--color-light',
      themeOptions.day.light,
    );
  }

  html.settings.overlay.open = false;
});

html.search.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === '' ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  if (result.length < 1) {
    html.other.message.classList.add('list__message_show');
  } else {
    html.other.message.classList.remove('list__message_show');
  }

  html.list.items.innerHTML = '';
  const newItems = document.createDocumentFragment();

  // To create list items for each of the books in the search results(after filters have been applied )
  for (const book of result.slice(0, BOOKS_PER_PAGE)) {
    // newItems.appendChild(createBookItem(book).createPreview());
    const { author, title, id, image } = book;
    const bookPreview = document.createElement('book-preview');
    bookPreview.setAttribute('data-preview-custom', id);
    bookPreview.setAttribute('data-title', title);
    bookPreview.setAttribute('data-image', image);
    bookPreview.setAttribute('data-author', authors[author]);
    newItems.appendChild(bookPreview);
  }

  html.list.items.appendChild(newItems);
  html.other.button.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

  html.other.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  html.search.overlay.open = false;
});

html.other.button.addEventListener('click', () => {
  const fragment = document.createDocumentFragment();

  for (const book of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE,
  )) {
    // fragment.appendChild(createBookItem(book).createPreview());
    const { author, title, id, image } = book;
    const bookPreview = document.createElement('book-preview');
    bookPreview.setAttribute('data-preview-custom', id);
    bookPreview.setAttribute('data-title', title);
    bookPreview.setAttribute('data-image', image);
    bookPreview.setAttribute('data-author', authors[author]);
    fragment.appendChild(bookPreview);
  }

  html.list.items.appendChild(fragment);
  page += 1;
});

html.list.items.addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    html.list.overlay.open = true;
    html.list.blur.src = active.image;
    html.list.image.src = active.image;
    html.list.title.innerText = active.title;
    html.list.subtitle.innerText = `${authors[active.author]} (${new Date(
      active.published,
    ).getFullYear()})`;
    html.list.description.innerText = active.description;
  }
});
