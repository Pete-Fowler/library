
// main array of books
let library = [];

// DOM elements and event listeners
const body = document.querySelector('body');
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
  displayBooks();
}

addBook('The Hobbit', 'J.R. Tolkein', 295, true); // for initial display during design

// works after save button is clicked on form, but then keeps going creating
// undefined values clearing library display

function displayBooks() {
  
 document.querySelectorAll('.book').forEach(e => e.remove());

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

// when #new-book button is clicked
// it will bring up a form for book input
// then add to library with addBook()
// then call displayBooks()

function newBook () {
  const panel = document.createElement('div');
  panel.id = 'panel';

  const form = document.createElement('form');
  form.id = 'form';

  // add title input
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Title:';
  const title = document.createElement('input');
  title.id = 'title';
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  form.appendChild(titleLabel);
  form.appendChild(title);

  // Author input
  const authorLabel = document.createElement('label');
  authorLabel.setAttribute('for', 'author');
  authorLabel.textContent = 'Author:';
  const author = document.createElement('input');
  author.id = 'author';
  author.setAttribute('type', 'text');
  author.setAttribute('name', 'author');
  form.appendChild(authorLabel);
  form.appendChild(author);

  // Pages input
  const pagesLabel = document.createElement('label');
  pagesLabel.setAttribute('for', 'pages');
  pagesLabel.textContent = 'Pages:';
  const pages = document.createElement('input');
  pages.id = 'pages';
  pages.setAttribute('type', 'number');
  pages.setAttribute('name', 'pages');
  form.appendChild(pagesLabel);
  form.appendChild(pages);

  // Pages input
  const readLabel = document.createElement('label');
  readLabel.setAttribute('for', 'read');
  readLabel.textContent = 'Read?';
  const read = document.createElement('input');
  read.id = 'read';
  read.setAttribute('type', 'checkbox');
  read.setAttribute('name', 'read');
  form.appendChild(readLabel);
  form.appendChild(read);

  // Save & Cancel buttons
  const wrapper = document.createElement('div');
  wrapper.id = 'button-wrapper';
  
  const save = document.createElement('button');
  save.id = 'save-button';
  save.textContent = 'Save';
  save.className = 'new-button';
  save.addEventListener('click', () => {addBook(title.value, author.value, pages.value, read.value)});

  const cancel = document.createElement('button');
  cancel.id = 'cancel-button';
  cancel.textContent = 'Cancel';
  cancel.className = 'new-button';
  cancel.addEventListener('click', displayBooks);

  // append!
  wrapper.appendChild(save);
  wrapper.appendChild(cancel);
  form.appendChild(wrapper);
  body.appendChild(panel);
  panel.appendChild(form);

}


