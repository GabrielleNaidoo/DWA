import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

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

// To create book items that appear on the page intially
const createBookItem = (book) => {
  const { author, id, image, title } = book;
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  element.innerHTML = `
      <img
          class="preview__image"
          src="${image}"
      />
      
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
  `;

  return element;
};

// For inital batch without filters
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  starting.appendChild(createBookItem(book));
}
html.list.items.appendChild(starting);

// To create first dropdown option for both genre and author:
const createFirstOption = (value, innerText) => {
  const firstOption = document.createElement('option');
  firstOption.value = value;
  firstOption.innerText = innerText;
  return firstOption;
};

// Function to populate dropdown for both Authors and Genres:
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

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  html.settings.theme.value = 'night';
  document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
  document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
  html.settings.theme.value = 'day';
  document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
  document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

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

html.settings.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty(
      '--color-light',
      '255, 255, 255',
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
    newItems.appendChild(createBookItem(book));
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
    fragment.appendChild(createBookItem(book));
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
