import { useDispatch, useSelector } from 'react-redux'
import Intro from '../../components/intro'
import Rating from '../../components/rating'
import Slider from '../../components/slider'
import Loader from '../../ui/loader/Loader'
import styles from './home.module.scss'
import { useEffect } from 'react'
import { fetchData } from '../../store/dataSlice'

function Home() {
  const dispatch = useDispatch()
  const {popularMovies,upcomingMovies,rating, popularSeries} = useSelector(state => state.data)

  useEffect(()=>{
    if (!upcomingMovies) {
      dispatch(fetchData('movie/upcoming'))
    }
    if (!popularMovies) {
      dispatch(fetchData('movie/popular'))
    }
    if (!rating) {
      dispatch(fetchData('movie/top_rated'))
    }
    if (!popularSeries) {
      dispatch(fetchData('tv/popular'))
    }
  },[])

  if (!popularMovies || !upcomingMovies || !rating || !popularSeries) return <Loader />
  return (
    <div>
      <Intro data={upcomingMovies.results} />
      <Slider data={popularMovies} type="movie" />
      <Slider data={popularSeries} type="tv" />
      <Rating data={rating} />
    </div>
  )
}

export default Home