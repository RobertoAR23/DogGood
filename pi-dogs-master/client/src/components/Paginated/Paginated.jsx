import React from 'react';
import './Paginated.css';

export default function Paginated({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginado(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumber.length) {
      paginado(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className='paginado'>
        <button id='pag'
          className="arrow"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pageNumber.map(number => (
          <button id='pag'
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => paginado(number)}
          >
            {number}
          </button>
        ))}
        <button id='pag'
          className="arrow"
          onClick={handleNextPage}
          disabled={currentPage === pageNumber.length}
        >
          {">"}
        </button>
      </ul>
    </nav>
  );
}
