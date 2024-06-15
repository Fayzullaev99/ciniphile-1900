import ReactPaginate from 'react-paginate'
import Card from '../../components/card'
import Container from '../../layout/container'
import Loader from '../../ui/loader/Loader'
import styles from './movies.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/dataSlice'

function Movies() {
  const [page,setPage] = useState(1)
  const dispatch = useDispatch()
  const {upcomingMovies} = useSelector(state => state.data)

  useEffect(()=>{
    dispatch(fetchData(`movie/upcoming?page=${page}`))
  },[page])

  function handlePageChange(e) {
    setPage(e.selected + 1);
  }
  if (!upcomingMovies) return <Loader />
  return (
    <div className={styles.movie}>
      <Container className={styles.movie__container}>
        <h2 className={styles.movie__title}>Все фильмы</h2>
        <div className={styles.movie__cards}>
          {upcomingMovies.results.map((el) => (
            <Card data={el} key={el.id} />
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={1}
          pageCount={upcomingMovies.total_pages}
          previousLabel="<"
          className={styles.movie__paginate}
          activeClassName={styles.movie__page_active}
        />
      </Container>
    </div>
  )
}

export default Movies