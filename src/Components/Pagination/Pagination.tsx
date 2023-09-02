import styles from "./Pagination.module.css";

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
    onPageChange(newPage);
  };

  return (
    <div className={styles['pagination-container']}>
      <button onClick={()=>onPaginationClick(-1)} disabled={page===1} className={styles['pagination-button']}>⏪</button>
      <button onClick={()=>onPaginationClick(1)} disabled={!hasRepositories} className={styles['pagination-button']}>⏩</button>
    </div>
  )
}