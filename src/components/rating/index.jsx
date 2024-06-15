import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './rating.module.scss'
import { useNavigate } from 'react-router-dom';

function Rating({data}) {
  const navigate = useNavigate()

  return (
    <div className={styles.rating}>
        <h3 className={styles.rating__title}>ТОП <span>10</span> </h3>
      <Swiper
      slidesPerView={3.5}
      spaceBetween={25}
      modules={[Navigation]}
      navigation={true}
      className={styles.rating__swiper}
      >
        
        {data.results.slice(0,10).map((item,i)=>(
          <SwiperSlide onClick={()=>navigate(`/detail/${item.id}`)} key={item.id} className={styles.rating__slide}>
            <p className={styles.rating__number}>{i+1}</p>
            <img src={import.meta.env.VITE_DB_W500 + item.poster_path} alt={item.title || item.name} className={styles.rating__image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Rating