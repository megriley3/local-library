function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const booksCheckedOut = books.filter((book) => !(book.borrows[0].returned));
  return booksCheckedOut.length;
}

function getMostCommonGenres(books) {
  const genreList =[];
  books.forEach((book) => {
    const {genre} = book;
    if(!genreList.find((genreInfo => genreInfo.name === genre))) {
      const count = books.filter((book) => book.genre === genre).length;
      genreList.push({name: genre, count});
    }
  });
  
  genreList.sort((genreA, genreB) => genreB.count - genreA.count);
  return genreList.slice(0,5);
}

function getMostPopularBooks(books) {
  books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  const popularBooks =[];
  for (let i=0; i<5; i++){
    const book = books[i];
    const name = book.title;
    const count = book.borrows.length;
    popularBooks.push({name, count});
  }
  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  //loop through each author
  let authorsByBorrows = [];
  authors.forEach((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    // loop through the books array and find each book written by the author
    const booksByAuthor = books.filter((book) => author.id === book.authorId);
    //loop through each book and find the number of borrows
    const count = booksByAuthor.reduce((borrows, book) => borrows += book.borrows.length, 0);
    //create an array of authors names and borrows counts
    authorsByBorrows.push({name, count});
  })
  //sort array most borrows to least
  authorsByBorrows.sort((authorA, authorB) => authorB.count - authorA.count);

  return authorsByBorrows.slice(0,5);
  
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
