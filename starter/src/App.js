/* eslint-disable no-unused-vars */
import './App.css';
import { useEffect, useState } from 'react';
import { getAll, search } from './BooksAPI';
import { Books } from './components/Books/Books';
import { Shelf } from './components/Shelf/Shelf';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [books, setBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);


  const getBooks = async () => {
    try {
      setBooks(await getAll());
    } catch (err) {
      console.error(err);
    }
  };

  const getSearchedBooks = async () => {
    const searchedBooksArr = await search(searchFilter);
    console.log(searchedBooksArr);
    if (searchedBooksArr.error) {
      console.log('error found ' + searchedBooksArr.error);
      setSearchedBooks([]);
      return;
    }
    setSearchedBooks(searchedBooksArr.map(searchedBook => {
      const bookInLibrary = books.find(book => book.id === searchedBook.id)
      if (bookInLibrary) searchedBook.shelf = bookInLibrary.shelf;
      return searchedBook
    }));
  };

  useEffect(() => {
    getBooks();
  }, []);


  useEffect(() => {
    if (searchFilter) {
      getSearchedBooks();
      return;
    }
    if (!searchFilter || !showSearchPage) {
      console.log('either search input is falsy or out of searchpage');
      setSearchedBooks([]);
      return;
    }
  }, [searchFilter]);

  useEffect(() => {
    if (!showSearchPage) {
      setSearchedBooks([]);
      setSearchFilter('');
    }
  }, [showSearchPage]);

  return (
    <div className='app'>
      {showSearchPage ? (
        <div className='search-books'>
          <div className='search-books-bar'>
            <button
              className='close-search'
              onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </button>
            <div className='search-books-input-wrapper'>
              <input
                type='text'
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                }}
                placeholder='Search by title, author, or ISBN'
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              <Books books={searchedBooks} setBooks={setBooks} />
            </ol>
          </div>
        </div>
      ) : (
        <div className='list-books'>
          <div className='list-books-title'>
            <h1>MyReads</h1>
          </div>
          <div className='list-books-content'>
            <div>
              <Shelf
                title={'Currently Reading'}
                books={books}
                shelfFilter={'currentlyReading'}
                setBooks={setBooks}
              />
              <Shelf
                title={'Want To Read'}
                books={books}
                shelfFilter={'wantToRead'}
                setBooks={setBooks}
              />
              <Shelf
                title={'Read'}
                books={books}
                shelfFilter={'read'}
                setBooks={setBooks}
              />
            </div>
          </div>
          <div className='open-search'>
            <button onClick={() => setShowSearchpage(!showSearchPage)}></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
