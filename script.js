// main array of books
const library = [];

// DOM elements and event listeners
const body = document.querySelector("body");
const main = document.querySelector("#main");
const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", newBook);

// Below later changed into class syntax as a learning exercise
// book constructor function
// function book (title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   }

// // toggle book read status and change read button styling
// book.prototype.toggleRead = function () {
//   let button = document.querySelector(`.book[data-n='${library.indexOf(this)}'] #toggle-button`);
//   if(this.read === 'Read') {
//     this.read = 'Not read';
//     button.textContent = 'Not read';
//     button.classList.toggle('read');
//   } else {
//     this.read = 'Read';
//     button.textContent = 'Read';
//     button.classList.toggle('read');
//   }
// }

// The above later changed into class syntax as a learning exercise
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    const button = document.querySelector(
      `.book[data-n='${library.indexOf(this)}'] #toggle-button`
    );
    if (this.read === "Read") {
      this.read = "Not read";
      button.textContent = "Not read";
      button.classList.toggle("read");
    } else {
      this.read = "Read";
      button.textContent = "Read";
      button.classList.toggle("read");
    }
  }
}

function removeModal(e) {
  const panel = document.querySelector("#panel");
  const isCancel = e.target.closest("#cancel-button");
  const isOutside = !e.target.closest("form");
  if (isOutside || isCancel) {
    panel.remove();
  }
}

function displayBooks() {
  document.querySelectorAll("#panel").forEach((e) => e.remove());
  document.querySelectorAll(".book").forEach((e) => e.remove());

  for (let i = 0; i < library.length; i++) {
    // create book element
    const book = document.createElement("div");
    book.className = "book";
    book.setAttribute("data-n", `${i}`);

    // add content into book card
    const p1 = document.createElement("p");
    p1.textContent = `Title: ${library[i].title}`;
    const p2 = document.createElement("p");
    p2.textContent = `Author: ${library[i].author}`;
    const p3 = document.createElement("p");
    p3.textContent = `Pages: ${library[i].pages}`;

    // remove button
    const remove = document.createElement("button");
    remove.id = "remove";
    remove.setAttribute("type", "button");
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      removeBook(i);
    });

    // toggle read button
    const toggle = document.createElement("button");
    toggle.id = "toggle-button";
    toggle.setAttribute = ("type", "button");
    toggle.textContent = `${library[i].read}`;
    if (library[i].read === "Read") {
      toggle.className = "read";
    } else {
      toggle.className = "not-read";
    }
    toggle.addEventListener("click", () => {
      library[i].toggleRead();
    });

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

function addBook(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
  displayBooks();
}

addBook("The Hobbit", "J.R. Tolkein", 295, "Read"); // for initial display

function removeBook(book) {
  library.splice(book, 1);
  displayBooks();
}

// changes checkbox value into yes/no
function isRead(val) {
  if (val === true) {
    return "Read";
  }
  return "Not read";
}

// adds form to DOM and then new book to library from inputs
function newBook() {
  const panel = document.createElement("div");
  panel.id = "panel";
  panel.addEventListener("click", removeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      removeModal();
    }
  });

  const form = document.createElement("form");
  form.id = "form";
  form.addEventListener('submit', () => {
    addBook(title.value, author.value, pages.value, isRead(read.checked));
});

  // add title input
  const title = document.createElement("input");
  title.id = "title";
  title.setAttribute("type", "text");
  title.setAttribute("name", "title");
  title.setAttribute("required", "");
  title.setAttribute("maxlength", "60");
  title.setAttribute("placeholder", "Title");
  form.appendChild(title);

  // Author input
  const author = document.createElement("input");
  author.id = "author";
  author.setAttribute("type", "text");
  author.setAttribute("name", "author");
  author.setAttribute("required", "");
  author.setAttribute("maxlength", "40");
  author.setAttribute("placeholder", "Author");
  form.appendChild(author);

  // Pages input
  const pages = document.createElement("input");
  pages.id = "pages";
  pages.setAttribute("type", "number");
  pages.setAttribute("name", "pages");
  pages.setAttribute("required", "");
  pages.setAttribute("min", "1");
  pages.setAttribute("max", "99999");
  pages.setAttribute("placeholder", "Pages");
  form.appendChild(pages);

  // Read input
  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.textContent = "Read?";
  const read = document.createElement("input");
  read.id = "read";
  read.setAttribute("type", "checkbox");
  pages.setAttribute("name", "read");
  form.appendChild(readLabel);
  form.appendChild(read);

  // Save & Cancel buttons
  const wrapper = document.createElement("div");
  wrapper.id = "button-wrapper";

  const save = document.createElement("button");
  save.id = "save-button";
  save.textContent = "Save";
  save.className = "new-button";
  save.setAttribute("type", "submit");

  const cancel = document.createElement("button");
  cancel.id = "cancel-button";
  cancel.textContent = "Cancel";
  cancel.className = "new-button";
  cancel.setAttribute("type", "button");
  cancel.addEventListener("click", panel.remove());

  // append
  form.appendChild(save);
  form.appendChild(cancel);
  body.appendChild(panel);
  panel.appendChild(form);
}