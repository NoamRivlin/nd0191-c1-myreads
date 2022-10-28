export const Book = ({ id, imageLinks, title, authors, shelf }) => {
  //   const { id, imageLinks, title, authors } = book;

  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks})`,
            }}></div>
          <div className='book-shelf-changer'>
            <select
              value={shelf || 'none'}
              onChange={(e) => {
                console.log(e.target.value);
              }}>
              <option value='asdasd' disabled>
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
        <div className='book-authors'>{authors.join(', ')}</div>
      </div>
    </li>
  );
};
