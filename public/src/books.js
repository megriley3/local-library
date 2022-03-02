function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksReturned =[];
  const booksCheckedOut =[];
  books.forEach((book) => {
    if(book.borrows[0].returned){
      booksReturned.push(book);
     } else {booksCheckedOut.push(book)}  
  })
 return [booksCheckedOut, booksReturned];
}

function getBorrowersForBook({borrows}, accounts) {
  const borrowersAccounts=[];
  for(let i=0; i<borrows.length && i<10; i++){
    const borrow = borrows[i];
    const {returned} = borrow; 
    let borrowersAccount = accounts.find((account) => account.id === borrow.id);
    borrowersAccount = {...borrowersAccount, returned};
    borrowersAccounts.push(borrowersAccount);    
  }
  return borrowersAccounts;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
