class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
const myLibrary = [];

const displayBooks = function displayMyLibraryToTable(bookObject) {
  const table = document.getElementById('books-table');
  const tableRow = table.insertRow();

  // gives data-attribute ID to row base on the current index of newly added book in myLibrary
  tableRow.dataset.bookId = myLibrary.length - 1;

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
};

const addBook = function addBookToLibrary(book) {
  myLibrary.push(book);
  myLibrary.forEach(displayBooks);
};

const createBook = function createBookInfo(event) {
  event.preventDefault(); // stop the form from submitting & refreshing page

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;

  const book = new Book(title, author, pages, read);
  addBook(book);
};

const deleteBook = function deleteBookFromRowAndLibrary() {
  const tableBody = document.querySelector('tbody');
  const rowIndex = this.parentNode.parentNode;
  tableBody.deleteRow(rowIndex);

  const row = this.parentNode.parentNode;
  const indexID = row.dataset.bookId;

  // find this info title and delete from myLibrary
  myLibrary.splice(indexID, 1);
};

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
