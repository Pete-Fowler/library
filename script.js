
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
  this.read = read;
  }

// toggle book read status and change read button styling
book.prototype.toggleRead = function () {
  let button = document.querySelector(`.book[data-n='${library.indexOf(this)}'] #toggle-button`);
  if(this.read === 'Read') {
    this.read = 'Not read';
    button.textContent = 'Not read';
    button.classList.toggle('read');
  } else {
    this.read = 'Read';
    button.textContent = 'Read';
    button.classList.toggle('read');
  }
}

function addBook (title, author, pages, read) {
  library.push(new book (title, author, pages, read));
  displayBooks();
}

addBook('The Hobbit', 'J.R. Tolkein', 295, 'Read'); // for initial display during design

function removeBook(book) {
  let a = document.querySelector(`.book[data-n='${book}']`);
  a.remove();
  library.splice(book, 1);
}

function removeModal() {
  document.querySelectorAll('#panel').forEach(e => e.remove());
}

function displayBooks() {

document.querySelectorAll('#panel').forEach(e => e.remove());
document.querySelectorAll('.book').forEach(e => e.remove());

  for(let i = 0; i < library.length; i++) {
    
    // create book element
    let book = document.createElement('div'); 
    book.className = 'book';
    book.setAttribute('data-n', `${i}`);
    
    // add content into book card
    let p1 = document.createElement('p');             
    p1.textContent = `Title: ${library[i].title}`;
    let p2 = document.createElement('p');
    p2.textContent = `Author: ${library[i].author}`;
    let p3 = document.createElement('p');
    p3.textContent = `Pages: ${library[i].pages}`;
    
    // remove button
    const remove = document.createElement('button');
    remove.id = 'remove';
    remove.setAttribute('type', 'button');
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {removeBook(i)});

    // toggle read button
    const toggle = document.createElement('button');
    toggle.id = 'toggle-button';
    toggle.setAttribute = ('type', 'button');
    toggle.textContent = `${library[i].read}`;
    if (library[i].read === 'Read') {
      toggle.className = 'read';
    } else {
      toggle.className = 'not-read';
    }
    toggle.addEventListener('click', () => {library[i].toggleRead()});

    // append onto book element
    book.appendChild(p1);                 
    book.appendChild(p2);
    book.appendChild(p3);
    book.appendChild(toggle);
    book.appendChild(remove);
    
    // insert book card before new book button
    main.insertBefore(book, newBookButton);
  }
}

// adds form to DOM and then new book to library from inputs
function newBook () {
  const panel = document.createElement('div');
  panel.id = 'panel';
  panel.addEventListener('click', removeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      removeModal();
    }
  });

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

  // Save & Cancel buttons
  const wrapper = document.createElement('div');
  wrapper.id = 'button-wrapper';
  
  const save = document.createElement('button');
  save.id = 'save-button';
  save.textContent = 'Save';
  save.className = 'new-button';
  save.setAttribute('type', 'button');
  save.addEventListener('click', () => {addBook(title.value, author.value, 
    pages.value, isRead(read.checked))});

  const cancel = document.createElement('button');
  cancel.id = 'cancel-button';
  cancel.textContent = 'Cancel';
  cancel.className = 'new-button';
  cancel.setAttribute('type', 'button');
  cancel.addEventListener('click', displayBooks);

  // append!
  wrapper.appendChild(save);
  wrapper.appendChild(cancel);
  form.appendChild(wrapper);
  body.appendChild(panel);
  panel.appendChild(form);

}

// changes checkbox value into yes/no
function isRead (val) {
  if (val === true) {
    return 'Read';
  } else {
    return 'Not read';
  }
}

