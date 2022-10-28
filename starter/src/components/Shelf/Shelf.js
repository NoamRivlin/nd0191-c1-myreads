import { useEffect, useState } from 'react';

export const Shelf = ({ title }) => {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>{}</ol>
      </div>
    </div>
  );
};
