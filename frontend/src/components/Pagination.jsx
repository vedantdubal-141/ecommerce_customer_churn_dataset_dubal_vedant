import './Pagination.css'

export default function Pagination({ page, total, limit, onChange }) {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button className="btn btn-small btn-outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      <span className="page-info">Page {page} of {totalPages}</span>
      <button className="btn btn-small btn-outline" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  )
}
