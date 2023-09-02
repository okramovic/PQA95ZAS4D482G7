type PaginationProps = {
  page: number;
  onPageChange: (newPage: number) => void;
  hasRepositories: boolean;
}

export const Pagination = ({
  page,
  onPageChange,
  hasRepositories,
}: PaginationProps) =>{

  const onPaginationClick = (delta: number)=>{
    const newPage = page + delta;
    if (newPage < 1) return;
    onPageChange(newPage)
  }

  return (
    <div className="pagination-container">
      <button onClick={()=>onPaginationClick(-1)} disabled={page===1}>⏪</button>
      <button onClick={()=>onPaginationClick(1)} disabled={!hasRepositories}>⏩</button>
    </div>
  )
}