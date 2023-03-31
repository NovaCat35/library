class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
const myLibrary = [];

// Goes through the rows and (re)assign in case to align row index with current myLibrary index
function assignIndexId(tableBody) {
  let id = 0;
  Array.from(tableBody.rows).forEach((row) => {
    row.dataset.indexId = id;
    id += 1;
  });
}

function displayBook(bookObject) {
  const tableBody = document.querySelector('tbody');
  const tableRow = tableBody.insertRow();

  // gives data-attribute ID to every row in tableBody to insure index matches with myLibrary
  assignIndexId(tableBody);

  // create table-data for each book info
  Object.keys(bookObject).forEach((info) => {
    const tableCell = tableRow.insertCell();
    const bookInfo = document.createTextNode(bookObject[info]);
    tableCell.appendChild(bookInfo);
  });

  // creates the delete btn for new row
  const deleteBtn = document.createElement('button');
  const tableCell = tableRow.insertCell();

  deleteBtn.classList.add('deleteBtn');
  deleteBtn.textContent = 'DELETE';
  tableCell.classList.add('deleteTD');
  tableCell.appendChild(deleteBtn);
  console.log(myLibrary);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBook(book);
}

const createBook = function createBookInfo(event) {
  event.preventDefault(); // stop the form from submitting & refreshing page

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
};

function deleteBook() {
  const row = this.parentNode.parentNode;
  const bookIndex = row.dataset.indexId;

  row.remove();
  myLibrary.splice(bookIndex, 1);

  // reassign data-attribute ID to row so row index is in the right order as myLibrary index
  const tableBody = document.querySelector('tbody');
  assignIndexId(tableBody);
  console.log(myLibrary);
}

// Sample Books at initial start of UI
const sampleBooks = [
  {
    title: 'Mere Christianity',
    author: 'C.S. Lewis',
    pages: 175,
    status: 'In progress',
  },
  {
    title: 'All Quiet on the Western Front',
    author: 'Erich Maria Remarque',
    pages: 295,
    status: 'In progress',
  },
];

sampleBooks.forEach((book) => {
  addBookToLibrary(book);
});

// -- MODAL FORM event listeners --
const displayForm = document.querySelector('button[class="add-book"]');
const modal = document.querySelector('.modal');
const submit = document.querySelector('button[type="submit"]');

displayForm.addEventListener('click', () => modal.classList.remove('hidden'));
submit.addEventListener('click', (event) => {
  modal.classList.add('hidden');
  createBook(event);
});

// -- DELETE event listeners --
document.addEventListener('DOMNodeInserted', () => {
  const deleteBookBtns = document.querySelectorAll('.deleteBtn');
  deleteBookBtns.forEach((deleteBtn) => deleteBtn.addEventListener('click', deleteBook));
});
