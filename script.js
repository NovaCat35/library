let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    } 
}

let submit = document.querySelector('button[type="submit"]');
submit.addEventListener('click', createBookInfo);

function createBookInfo(event) {
    event.preventDefault();     // stop the form from submitting & refreshing page

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
}

// create a new book object & add it to the array
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary)
}

// Display the book from array on screen
function displayLibrary() {

}