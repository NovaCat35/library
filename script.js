class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
const myLibrary = [];

// Display the book from array to table
function displayLibrary(bookObject) {
  const table = document.getElementById('books-table');
  const tableRow = table.insertRow();

  Object.keys(bookObject).forEach((info) => {
    const tableCell = tableRow.insertCell();
    const bookInfo = document.createTextNode(bookObject[info]);
    tableCell.appendChild(bookInfo);
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  myLibrary.forEach(displayLibrary);
}

function createBookInfo(event) {
  event.preventDefault(); // stop the form from submitting & refreshing page

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
}

const displayForm = document.querySelector('button[class="add-book"]');
const modal = document.querySelector('.modal');
const submit = document.querySelector('button[type="submit"]');

displayForm.addEventListener('click', () => modal.classList.remove('hidden'));
submit.addEventListener('click', (event) => {
  modal.classList.add('hidden');
  createBookInfo(event);
});
