/* eslint-disable no-unused-vars */
import { Book } from './Book';

export const Books = ({ books, setBooks }) => {


  return (
    <>
      {books &&
        books.map((book) => {
          let { title, id, authors, subtitle, shelf, imageLinks } = book;
          imageLinks =
            imageLinks?.smallThumbnail ||
            'https://after12thwhat.com/wp-content/uploads/2016/12/no_img.jpg';

          return (
            <Book
              key={id}
              id={id}
              imageLinks={imageLinks}
              title={title}
              authors={authors}
              shelf={shelf}
              book={book}
              setBooks={setBooks}
            />
          );
        })}
    </>
  );
};
