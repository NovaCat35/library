class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
let myLibrary = [];

// -----------------------------------
// Goes through the rows and (re)assign in case to align row index with current myLibrary index
function assignIndexId(tableBody) {
  let id = 0;
  Array.from(tableBody.rows).forEach((tr) => {
    const row = tr;
    row.dataset.indexId = id;
    id += 1;
  });
}

function checkTableEmpty() {
  const alert = document.querySelector('.empty-table-alert');
  const rowsLength = document.querySelectorAll('table tbody tr').length;
  if (rowsLength === 0) {
    alert.classList.add('active');
  } else {
    alert.classList.remove('active');
  }
}

function deleteBook() {
  const row = this.parentNode.parentNode;
  const bookIndex = row.dataset.indexId;

  row.remove();
  myLibrary.splice(bookIndex, 1);
  // -- SAVE myLibrary info to LOCAL STORAGE --
  localStorage.setItem('myLibraryKey', JSON.stringify(myLibrary));

  // reassign data-attribute ID to row so row index is in the right order as myLibrary index
  const tableBody = document.querySelector('tbody');
  assignIndexId(tableBody);

  checkTableEmpty();
}

function changeStatus() {
  if (this.className === 'status complete') {
    this.className = 'status in-progress';
    this.src = 'images/in-progress.svg';
  } else {
    this.className = 'status complete';
    this.src = 'images/complete.svg';
  }
}

function displayBook(bookObject) {
  const tableBody = document.querySelector('tbody');
  const tableRow = tableBody.insertRow();

  // gives data-attribute ID to every row in tableBody to insure index matches with myLibrary
  assignIndexId(tableBody);

  // create table-data for each book info
  Object.keys(bookObject).forEach((info) => {
    const tableCell = tableRow.insertCell();
    if (info !== 'status') {
      const bookInfo = document.createTextNode(bookObject[info]);
      tableCell.appendChild(bookInfo);
    } else {
      const img = document.createElement('img');
      img.classList.add('status');

      if (bookObject[info] === true) {
        img.src = 'images/complete.svg';
        img.classList.add('complete');
      } else {
        img.src = 'images/in-progress.svg';
        img.classList.add('in-progress');
      }
      // -- STATUS event listeners --
      img.addEventListener('click', changeStatus);
      tableCell.appendChild(img);
    }
  });

  // CREATE delete btn for new row
  const deleteBtn = document.createElement('button');
  const tableCell = tableRow.insertCell();

  deleteBtn.classList.add('deleteBtn');
  tableCell.classList.add('deleteTD');

  deleteBtn.textContent = 'DELETE';
  // -- DELETE event listeners --
  deleteBtn.addEventListener('click', deleteBook);
  tableCell.appendChild(deleteBtn);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBook(book);

  // Convert the array to a JSON string
  const jsonString = JSON.stringify(myLibrary);
  // Save the JSON string to local storage
  localStorage.setItem('myLibraryKey', jsonString);
}

function createBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const status = document.getElementById('status').checked;

  const book = new Book(title, author, pages, status);
  addBookToLibrary(book);
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('status').checked = '';

  const inputs = document.querySelectorAll('.input-container input');

  inputs.forEach((input) => {
    const label = input.previousElementSibling;
    label.classList.remove('focus');
  });
}

function addRemoveModal(displayFormBtn, modal) {
  if (displayFormBtn.classList.contains('add-btn')) {
    displayFormBtn.classList.remove('add-btn');
    displayFormBtn.classList.add('remove-btn');
    modal.classList.remove('hidden');
  } else {
    displayFormBtn.classList.add('add-btn');
    displayFormBtn.classList.remove('remove-btn');
    modal.classList.add('hidden');
  }
  clearForm();
}

function placeholderActive(selector) {
  return document.querySelector(`#${selector}:placeholder-shown`);
}

// -----------------------------------
// Sample Books at initial start of UI
const sampleBooks = [
  {
    title: 'Trapeze (2012)',
    author: 'Simon Mawer',
    pages: 385,
    status: true,
  },
  {
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    pages: 177,
    status: true,
  },
  {
    title: 'All Quiet on the Western Front',
    author: 'Erich Maria Remarque',
    pages: 295,
    status: false,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 281,
    status: true,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 137,
    status: false,
  },
];

// -----------------------------------
// RETRIEVE myLibrary info from LOCAL STORAGE
if (localStorage.getItem('myLibraryKey') === null) {
  // add the default books
  sampleBooks.forEach((book) => {
    addBookToLibrary(book);
  });
} else {
  const jsonString = localStorage.getItem('myLibraryKey');
  // Convert the JSON string back to an array of objects (*repopulate myLibrary*)
  myLibrary = JSON.parse(jsonString);
  myLibrary.forEach((book) => displayBook(book));
  checkTableEmpty();
  // localStorage.clear();
}

// -----------------------------------
// -- MODAL FORM event listeners --
const displayFormBtn = document.querySelector('button[class*="display-form-btn"]');
const modal = document.querySelector('.modal');
const submit = document.querySelector('button[type="submit"]');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('.input-container input');

// Show label popup on focus | remove when off-focus
inputs.forEach((input) => input.addEventListener('focus', (event) => {
  const label = event.target.previousElementSibling;
  label.classList.add('focus');
}));
inputs.forEach((input) => input.addEventListener('focusout', (event) => {
  const label = event.target.previousElementSibling;
  const inputID = event.target.id;
  if (placeholderActive(inputID)) {
    label.classList.remove('focus');
  }
}));

// Show the form/modal
displayFormBtn.addEventListener('click', addRemoveModal.bind(null, displayFormBtn, modal));

// submission btn checks validity, take info, and clears form
submit.addEventListener('click', (event) => {
  if (form.checkValidity()) {
    event.preventDefault(); // stop the form from submitting & refreshing page
    createBook(event);
    addRemoveModal(displayFormBtn, modal);
    clearForm(inputs);
    checkTableEmpty();
  }
});

const renewBtn = document.querySelector('#renewBtn');
renewBtn.addEventListener('click', () => {
  sampleBooks.forEach((book) => {
    const newBook = book;
    newBook.status = false;
    addBookToLibrary(newBook);
    checkTableEmpty();
  });
});
