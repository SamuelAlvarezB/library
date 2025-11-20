class Library {

    myLibrary = [];
    #library = document.getElementById("library");
    book;

    constructor() {

    }

    addBookToLibrary(book) {
        this.book = book;
        this.myLibrary.push(this.book);

    }

    displayBooks() {
        this.#library.innerHTML = "";
        for (const book of this.myLibrary) {
            let bookDiv = document.createElement("div");
            bookDiv.setAttribute("data-id", book.id);
            bookDiv.classList.add("book-card");
            if (book.isRead) {
                bookDiv.classList.add("book-read");
            }
            bookDiv.innerHTML = '<p>Title: ' + book.title + '</p><p>Author: ' + book.author + '</p><p>Number of pages: ' + book.pages + '</p><p>Description: ' + book.description + '</p><button class="deleteButton">Delete book</button>';
            this.#library.appendChild(bookDiv);
        }
        this.deleteBook();

    }


    deleteBook() {
        let deleteButtons = document.getElementsByClassName("deleteButton");
        for (const button of deleteButtons) {
            button.addEventListener('click', (e) => {
                let dataID = e.target.parentElement.getAttribute("data-id");
                for (let i = 0; i < this.myLibrary.length; i++) {
                    console.log(this.myLibrary[i].id);
                    if (dataID === this.myLibrary[i].id) {
                        this.myLibrary.splice(i, 1);
                    }
                }
                this.displayBooks();
            });
        }
    }

}

class Book {
    constructor(id, title, author, pages, description, isRead) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.description = description;
        this.isRead = isRead;
    }
}

let library = new Library();

const addButton = document.getElementById("addButton");
addButton.addEventListener('click', (e) => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let description = document.getElementById('description').value;
    let read = document.getElementById("isRead");
    if (read.checked === true) {
        read = true;
    } else {
        read = false;
    }
    let newBook = new Book(crypto.randomUUID(), title, author, pages, description, read);
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('description').value = "";
    document.getElementById("isRead").checked = false;
    library.addBookToLibrary(newBook);
    //console.log(library.myLibrary)
    library.displayBooks();
});

