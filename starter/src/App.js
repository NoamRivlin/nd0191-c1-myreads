/* eslint-disable no-unused-vars */
import './App.css';
import { useEffect, useState } from 'react';
import { getAll, search } from './BooksAPI';
import { Books } from './components/Books/Books';
import { Shelf } from './components/Shelf/Shelf';

//if made the books in a different component it take 2 sec to load them in the searchpage...
//error of process undefined is annoying but not critical....
// i need to share the state of books and their value (their option value i guess)
//when an if there time add a isLoading when switching book's shelf
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
    setSearchedBooks(searchedBooksArr);
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  useEffect(() => {
    if (searchFilter) {
      console.log(searchFilter);
      getSearchedBooks();
      return;
    }
    if (!searchFilter || !showSearchPage) {
      console.log('either search input is falsy or out of searchpage');
      // clearSearchedBooks();
      setSearchedBooks([]);
      return;
    }
  }, [searchFilter]);

  useEffect(() => {
    if (!showSearchPage) {
      setSearchedBooks([]);
      setSearchFilter('');
      // clearSearchedBooks();
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
              {/* {books &&
                books.map((book) => {
                  let {
                    title,
                    id,
                    authors,
                    subtitle,
                    readingModes,
                    imageLinks,
                  } = book;
                  imageLinks = imageLinks.smallThumbnail;

                  return (
                    <div className='book' key={id}>
                      <div className='book-top'>
                        <div
                          className='book-cover'
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${imageLinks})`,
                          }}></div>
                        <div className='book-shelf-changer'>
                          <select>
                            <option value='none' disabled>
                              Move to...
                            </option>
                            <option value='currentlyReading'>
                              Currently Reading
                            </option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                          </select>
                        </div>
                      </div>
                      <div className='book-title'>{title}</div>
                      <div className='book-authors'>{authors}</div>
                    </div>
                  );
                })} */}
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
              {/*----- insert component before shelf to replace it----------- */}
              {/* <div className='bookshelf'>
                <h2 className='bookshelf-title'>Currently Reading</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>To Kill a Mockingbird</div>
                        <div className='book-authors'>Harper Lee</div>
                      </div>
                    </li>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 188,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>Ender's Game</div>
                        <div className='book-authors'>Orson Scott Card</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div> */}
              {/* -------end of curerently reading shelf----- */}

              <Shelf
                title={'Want To Read'}
                books={books}
                shelfFilter={'wantToRead'}
                setBooks={setBooks}
              />
              {/* <div className='bookshelf'>
                <h2 className='bookshelf-title'>Want to Read</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>1776</div>
                        <div className='book-authors'>David McCullough</div>
                      </div>
                    </li>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>
                          Harry Potter and the Sorcerer's Stone
                        </div>
                        <div className='book-authors'>J.K. Rowling</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div> */}

              <Shelf
                title={'Read'}
                books={books}
                shelfFilter={'read'}
                setBooks={setBooks}
              />

              {/* <div className='bookshelf'>
                <h2 className='bookshelf-title'>Read</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>The Hobbit</div>
                        <div className='book-authors'>J.R.R. Tolkien</div>
                      </div>
                    </li>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 174,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>
                          Oh, the Places You'll Go!
                        </div>
                        <div className='book-authors'>Seuss</div>
                      </div>
                    </li>
                    <li>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
                            }}></div>
                          <div className='book-shelf-changer'>
                            <select>
                              <option value='none' disabled>
                                Move to...
                              </option>
                              <option value='currentlyReading'>
                                Currently Reading
                              </option>
                              <option value='wantToRead'>Want to Read</option>
                              <option value='read'>Read</option>
                              <option value='none'>None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>
                          The Adventures of Tom Sawyer
                        </div>
                        <div className='book-authors'>Mark Twain</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div> */}
            </div>
          </div>
          <div className='open-search'>
            <button onClick={() => setShowSearchpage(!showSearchPage)}>
              Add A Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
