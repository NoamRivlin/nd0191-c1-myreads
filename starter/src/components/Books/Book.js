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
  //   const { id, imageLinks, title, authors } = book;
  //need some useState useEffect to hold the value of the select
  //using that to move between shelves
  //that means i should set the states in the app because it should reflect in both
  //main and search

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
              value={shelf || 'none'}
              onChange={(e) => {
                console.log(e.target.value);
                update(book, e.target.value).then((json) =>
                  getAll().then((books) => setBooks(books))
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
