//two parameters: array of account objects, single account id
//return account object of matching id
function findAccountById(accounts, id) {
  let foundAccount = {};
  accounts.forEach((account) => {if(account.id === id)  return foundAccount = account;} );
  return foundAccount;

}
//sort objects in the array by last name
function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => (accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()) ? 1 : -1);
  return accounts
}

//returns a number that represents the number of times the account has borrowed a book

function getTotalNumberOfBorrows({id}, books) {
  let accountMatches = books.reduce((bookBorrows, book) => {
    //get an arry of the borrowed books ids
    let idList = getBookBorrowersIds(book);
    //check if the borrower id matches the account id
    bookBorrows += (idList.filter((borrower) => borrower === id)).length;
    return bookBorrows;
  }, 0);
  //return the number
  return accountMatches; 
}

//create an array of the books.borrows[i].id values
function getBookBorrowersIds(book){
  return book.borrows.reduce((ids, borrowerInfo) => {ids.push(borrowerInfo.id); return ids;}, []);
}

function getBooksPossessedByAccount({id}, books, authors) {
  //find books that were last borrowed by the account and are not returned
  let borrowedBooks = books.filter((book) => book.borrows[0].id === id && !book.borrows[0].returned);
  borrowedBooks = borrowedBooks.map((book) => book = {...book, author: findAuthor(book, authors)});
  return borrowedBooks;
   
}

//find the author that wrote a book
function findAuthor({authorId}, authors){
  return authors.find((author) => author.id === authorId);
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
