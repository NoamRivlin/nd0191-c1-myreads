import { Books } from '../Books/Books';

export const Shelf = ({ title, books, shelfFilter, setBooks }) => {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          <Books
            books={books.filter((book) => book.shelf === shelfFilter)}
            setBooks={setBooks}
          />
        </ol>
      </div>
    </div>
  );
};
