
// main array of books
let library = [];

// DOM elements and event listeners
const main = document.querySelector('#main');
const newBookButton = document.querySelector('#new-book');
newBookButton.addEventListener('click', newBook);

// book constructor function
function book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.info = function () {
    return `Title: ${this.title} Author: ${this.author} Pages: ${this.pages} Read yet? ${this.read}`;
  }
}

function addBook (title, author, pages, read) {
  library.push(new book (title, author, pages, read));
}

addBook('The Hobbit', 'J.R. Tolkein', 295, true); // for initial display during design

function displayBooks() {
  
 
  for(let i = 0; i < library.length; i++) {
    
    // create book element
    let book = document.createElement('div'); 
    book.className = 'book';
    
    // add content into book card
    let p1 = document.createElement('p');             
    p1.textContent = `Title: ${library[i].title}`;
    let p2 = document.createElement('p');
    p2.textContent = `Author: ${library[i].author}`;
    let p3 = document.createElement('p');
    p3.textContent = `Pages: ${library[i].pages}`;
    let p4 = document.createElement('p');
    p4.textContent = `Read yet? ${library[i].read}`;
    
    // append paragraphs onto book element
    book.appendChild(p1);                 
    book.appendChild(p2);
    book.appendChild(p3);
    book.appendChild(p4);
    
    // insert book card before new book button
    main.insertBefore(book, newBookButton);
  }
}

displayBooks(); // for initial display during design

// when #new-book button is clicked
// it will bring up a form for book input
// then add to library with addBook()
// then call displayBooks()

function newBook () {
  const form = document.createElement('div');
  form.id = form;
  main.appendChild(form);
}


