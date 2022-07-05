const bookForm = document.querySelector('#book-form');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const booksList = document.querySelector('#book-list');

export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  add() {
    const bookObj = { allbook: [] };
    if (JSON.parse(localStorage.getItem('books')) == null) {
      localStorage.setItem('books', JSON.stringify(bookObj));
    }

    const obj = JSON.parse(localStorage.getItem('books'));

    if (this.title.value !== '' && this.author.value !== '') {
      obj.allbook.push({
        title: this.title,
        author: this.author,
      });
    }
    localStorage.setItem('books', JSON.stringify(obj));
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      const text = el.parentElement.parentElement.firstChild.innerText.split('.')[0];
      el.parentElement.parentElement.remove();
      // Added code to remove
      const obj = JSON.parse(localStorage.getItem('books'));
      const books = { allbook: [] };
      obj.allbook.forEach((el) => {
        if (`"${el.title}` !== text) {
          books.allbook.push(el);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}
function display() {
  const obj = JSON.parse(localStorage.getItem('books'));
  if (obj !== undefined) {
    // Added below and added a fullstop to separate title
    booksList.innerHTML = '';
    obj.allbook.forEach((item) => {
      booksList.innerHTML += `
            <td>${'"'}${item.title}${'."'}${' '}${'By'}${' '}${item.author}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Remove</a></td>
            `;
    });
  }
}
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = new Book(bookTitle.value, bookAuthor.value);
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    newBook.add();
    bookTitle.value = '';
    bookAuthor.value = '';
    display();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  Book.deleteBook(e.target);
});

const d = new Date();
document.getElementById('current_date').innerHTML = d;

const newBook = document.getElementById('newbookLi');
const myForm = document.getElementById('myForm');
const myBookList = document.getElementById('bookList');
const myList = document.getElementById('list');
const myHome = document.getElementById('home');
const myContact = document.getElementById('contacts');
const contactNavLink = document.getElementById('contactNavLi');

newBook.addEventListener('click', (e) => {
  e.preventDefault();
  myForm.classList.remove('d-none');
  newBook.classList.add('active');
  myList.classList.remove('active');
  myBookList.classList.add('d-none');
  contactNavLink.classList.remove('active');
  myContact.classList.add('d-none');
});

myList.addEventListener('click', (e) => {
  e.preventDefault();
  myList.classList.add('active');
  myForm.classList.add('d-none');
  myBookList.classList.remove('d-none');
  newBook.classList.remove('active');
  contactNavLink.classList.remove('active');
  myContact.classList.add('d-none');
});

myHome.addEventListener('click', (e) => {
  e.preventDefault();
  myList.classList.add('active');
  myForm.classList.add('d-none');
  myBookList.classList.remove('d-none');
  newBook.classList.remove('active');
  contactNavLink.classList.remove('active');
  myContact.classList.add('d-none');
});

contactNavLink.addEventListener('click', (e) => {
  e.preventDefault();
  contactNavLink.classList.add('active');
  myForm.classList.add('d-none');
  myList.classList.remove('active');
  myBookList.classList.add('d-none');
  newBook.classList.remove('active');
  myContact.classList.remove('d-none');
});

myForm.classList.add('d-none');
myContact.classList.add('d-none');
// Added for display on refresh
window.onload = display();
