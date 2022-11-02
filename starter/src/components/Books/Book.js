import { useState } from 'react';
import { getAll, update } from '../../BooksAPI';

export const Book = ({
  id,
  imageLinks,
  title,
  authors,
  shelf,
  book,
  setBooks,
}) => {


  const [shelfValue, setShelfValue] = useState(shelf || 'none');


  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundSize: '128px 193px',
              backgroundImage: `url(${imageLinks})`,
            }}></div>
          <div className='book-shelf-changer'>
            <select
              // value={shelf || 'none'}
              value={shelfValue}
              onChange={(e) => {
                console.log(e.target.value);
                setShelfValue(e.target.value)
                update(book, e.target.value).then((updatedShelvesObject) => {
                  // console.log(updatedShelvesObject)
                  getAll().then((books) => {
                    setBooks(books)
                    // setSearchedBooks(books)
                  })
                }
                );
              }}>
              <option disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>
          {authors ? authors.join(', ') : 'unknown author'}
        </div>
      </div>
    </li>
  );
};
