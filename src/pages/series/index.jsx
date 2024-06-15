import styles from './series.module.scss'
import ReactPaginate from 'react-paginate'
import Card from '../../components/card'
import Container from '../../layout/container'
import Loader from '../../ui/loader/Loader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/dataSlice'

function Series() {
  const [page,setPage] = useState(1)
  const dispatch = useDispatch()
  const {upcomingSeries} = useSelector(state => state.data)

  useEffect(()=>{
    dispatch(fetchData(`tv/airing_today?page=${page}`))
  },[page])

  function handlePageChange(e) {
    setPage(e.selected + 1);
  }
  if (!upcomingSeries) return <Loader />
  return (
    <div className={styles.serie}>
      <Container className={styles.serie__container}>
        <h2 className={styles.serie__title}>Все сереалы</h2>
        <div className={styles.serie__cards}>
          {upcomingSeries.results.map((el) => (
            <Card data={el} key={el.id} />
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={1}
          pageCount={upcomingSeries.total_pages}
          previousLabel="<"
          className={styles.serie__paginate}
          activeClassName={styles.serie__page_active}
        />
      </Container>
    </div>
  )
}

export default Series