class Book {
  constructor (name, nbOfPages, nbOfChapiters) {
    this.name = name;
    this.nbOfPages = nbOfPages;
    this.nbOfChapiters = nbOfChapiters;
  }

  getInformation = () => {
    return "nom: "+this.name+"nombre de page: "+this.nbOfPages+"nombre de chapitres"+this.nbOfChapiters;
  }

  getAverageNumberOfPagePerChapter = () => {
    return this.nbOfPages/this.nbOfChapiters;
  }

  getName = () => {
    return this.name;
  }
}

class Library {
  constructor (listOfBooks) {
    this.listOfAvaibleBooks = listOfBooks;
    this.listOfBorrowedBooks = [];
  }

  addBook = (book) => {
    this.listOfAvaibleBooks.push(book);
  }

  removeBook = (bookToRemove) => {
    for (let book in this.listOfAvaibleBooks) {
      if (book === bookToRemove) {
        const index = this.listOfAvaibleBooks.indexOf(book);
        if (index > -1) this.listOfAvaibleBooks.splice(index, 1);
      }
    }
  }

  borrowBook = (name) => {
    for (let b in this.listOfAvaibleBooks) {
      if (b.getName() === name) {
        const index = this.listOfAvaibleBooks.indexOf(b);
        if (index > -1) this.listOfAvaibleBooks.splice(index, 1);
        this.listOfBorrowedBooks.push(b);
      } else {
        return Error("Book not available")
      }
    }
  }

}
