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

export default function Pagination({currentPage, total, limit, onPageChange}) {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)

  return (
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
  )
}
