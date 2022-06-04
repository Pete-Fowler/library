

let library = [];

const main = document.querySelector('#main');

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

addBook('The Hobbit', 'J.R. Tolkein', 295, true);
addBook('Boogie Nights', 'Dirk Diggler', 300, false);

// loop through array with for
// display each book on page
//  create an element div with class book for each book, append content to it, append it to shelf
function displayBooks() {

  for(let i = 0; i < library.length; i++) {
    let book = document.createElement('div');
    book.className = 'book';
    //book.textContent = library[i].info();
    let p1 = document.createElement('p');
    p1.textContent = `Title: ${library[i].title}`;
    let p2 = document.createElement('p');
    p2.textContent = `Author: ${library[i].author}`;
    let p3 = document.createElement('p');
    p3.textContent = `Pages: ${library[i].pages}`;
    let p4 = document.createElement('p');
    p4.textContent = `Read yet? ${library[i].read}`;
    book.appendChild(p1);
    book.appendChild(p2);
    book.appendChild(p3);
    book.appendChild(p4);
    main.appendChild(book);
  }
  let newBook = document.createElement('button');
  newBook.id = 'new-book';
  newBook.textContent = '+';
  main.appendChild(newBook);
}

displayBooks();