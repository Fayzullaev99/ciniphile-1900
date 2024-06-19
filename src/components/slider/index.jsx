import arrow from "../../images/right.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './slider.module.scss'
import { Link } from 'react-router-dom';
import InfoBlock from '../infoBlock';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/dataSlice";


function Slider({ data, type }) {
  const [movie, setMovie] = useState(null)
  const [serie, setSerie] = useState(null)
  const dispatch = useDispatch()
  const { infoMovie, castsMovie, infoSerie, castsSerie } = useSelector(state => state.data)
  useEffect(() => {
    if (movie || serie) {
      dispatch(fetchData(`${type == 'movie' ? `movie/${movie}` : `tv/${serie}`}`))
      dispatch(fetchData(`${type == 'movie' ? `movie/${movie}/credits` : `tv/${serie}/credits`}`))
    }
  }, [movie, serie])
  return (
    <div className={styles.slider}>
      <h3 className={styles.slider__title}>{type == "movie" ? "Фильмы" : "Сереалы"} <img src={arrow} alt='right arrow' /></h3>
      <Swiper
        slidesPerView={5}
        spaceBetween={25}
        modules={[Navigation]}
        navigation={true}
        className={styles.slider__swiper}
      >

        {data.results.map((item) => (
          <SwiperSlide onClick={() => type == "movie" ? setMovie(item.id) : setSerie(item.id)} key={item.id} className={styles.slider__slide}>
            <img src={import.meta.env.VITE_DB_W500 + item.poster_path} alt={item.title || item.name} className={styles.slider__image} />
          </SwiperSlide>
        ))}
        <SwiperSlide className={styles.slider__slide}>
          <Link className={styles.slider__link}>
            Все {type == "movie" ? "Фильмы" : "Сереалы"}
            <img src={arrow} alt='right arrow' />
          </Link>
        </SwiperSlide>
      </Swiper>
      {movie && <InfoBlock data={infoMovie} casts={castsMovie} setMovie={setMovie} />}
      {serie && <InfoBlock data={infoSerie} casts={castsSerie} setMovie={setSerie} />}
    </div>
  )
}

export default Slider