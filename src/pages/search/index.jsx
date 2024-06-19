import { useEffect, useState } from 'react'
import Container from '../../layout/container'
import styles from './search.module.scss'
import Loader from '../../ui/loader/Loader'
import Card from '../../components/card'
import Recommend from '../../components/recommend'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/dataSlice'

function Search() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const {searchResults, popularMovies} = useSelector(state => state.data)

  useEffect(()=>{
    dispatch(fetchData(`search/multi?query=${search}&language=en-US`))
    if (!popularMovies) {
      dispatch(fetchData(`movie/popular`))
    }
  },[search])

  if (!searchResults || !popularMovies) return <Loader />
  return (
    <div className={styles.search}>
      <Container className={styles.search__container}>
        <input
          type="text"
          placeholder='Найти фильм, сериал...'
          className={styles.search__input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchResults.results.length ? (
          <div className={styles.search__results}>
            {searchResults.results.map((item) => (
              <Card data={item} key={item.id} />
            ))}
          </div>
        ) : (
          <Recommend data={popularMovies} />
        )}


      </Container>
    </div>
  )
}

export default Search