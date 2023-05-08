import React from 'react'
import './Paginated.css'

export default function Paginated({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className='paginado'>
        {pageNumber &&
          pageNumber.map(number => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={number}
              className={currentPage === number ? "selected" : ""}
              onClick={() => paginado(number)}
            >
              {number}
            </a>
          ))}
      </ul>
    </nav>
  )
}

