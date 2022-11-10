import { useState, useEffect } from 'react'
import './pagination.css'

const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

const PaginationItem = ({page, currentPage, onPageChange}) => {
  return (
    <li
      className={`page-item ${page === currentPage ? 'active' : ''}`}
      onClick={() => onPageChange(page)}
    >
      <span className='page-link'>{page}</span>
    </li>
  )
}

export default function Pagination({currentPage, total, limit, onPageChange, onItemsPerPageChange}) {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)


  const [firstPageItem, setFirstPageItem] = useState('')
  const [lastPageItem, setLastPageItem] = useState('')
  useEffect(() => {
  const lowPageBoundry = (verifyPage, itemsPerPage) => {
    if (verifyPage === 1) {
      return 1
    } else {
      return (verifyPage * itemsPerPage) - itemsPerPage + 1
    }
  }
  
  const highPageBoundry = (verifyPage, itemsPerPage) => {
    if (verifyPage === pagesCount) {
      return total
    } else {
      return (verifyPage * itemsPerPage) 
    }
  }
    setFirstPageItem(lowPageBoundry(currentPage, limit))
    setLastPageItem(highPageBoundry(currentPage, limit))
  }, [currentPage, limit, pagesCount, total])
  
  return (
    <div className='pagination-container'>
      <ul className='pagination'>
        {pages.map((page) => (
          <PaginationItem
            page={page}
            key={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
          ))
        }
      </ul>
      <div className='items-per-page'>
        Items per page:
        <select value={limit} onChange={onItemsPerPageChange}>
          <option defaultValue='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value={total}>All</option>
        </select>
        <span>Showing {firstPageItem}-{lastPageItem} of {total}</span> 
      </div>
    </div>
  )
}
