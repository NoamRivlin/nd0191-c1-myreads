import { useEffect, useState } from 'react';
import { getAll } from '../../BooksAPI';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    // export const getAll = () =>
    // fetch(`${api}/books`, { headers })
    //   .then((res) => res.json())
    //   .then((data) => data.books);

    try {
      // console.log(await getAll());
      setBooks(await getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    // not sure if to add the <ol> to this...lets just return Books in here
    <>
      {books &&
        books.map((book) => {
          let { title, id, authors, subtitle, readingModes, imageLinks } = book;
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
                    <option value='currentlyReading'>Currently Reading</option>
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
        })}
    </>
  );
};
