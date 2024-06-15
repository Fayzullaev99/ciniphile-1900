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


function Slider({data,type}) {
  const [infoBlock,setInfoBlock] = useState(null)
  const dispatch = useDispatch()
  const {tvInfo,movieInfo} = useSelector(state => state.data)
  useEffect(()=>{
    dispatch(fetchData(`${type}/${infoBlock}`))
  },[infoBlock])
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
        
        {data.results.map((item)=>(
          <SwiperSlide onClick={()=>setInfoBlock(item.id)} key={item.id} className={styles.slider__slide}>
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
      {infoBlock && <InfoBlock active={infoBlock} type={type} />}
    </div>
  )
}

export default Slider