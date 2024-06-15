import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";
import styles from './intro.module.scss'
import Button from '../../ui/button';
import { useRef, useState } from "react";


function Intro({ data }) {
    const [nextSlide,setNextSlide] = useState(1)
    const line = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
     if (line.current) {
        line.current.style.width = `${ (1 - progress) * 100}%`
        line.current.style.background = `#fff`
     }
    };
    function changeNextSlide(slide) {
       if (slide.activeIndex == 19) {
       setNextSlide(0)
    }else{
        setNextSlide(slide.activeIndex + 1)
    }
}
    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay,Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={changeNextSlide}
                navigation={{nextEl:".intro__next"}}
                className={styles.intro__swiper}
            >
                {data.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className={styles.intro__slide}
                    >
                        <img src={import.meta.env.VITE_DB_ORG + item.backdrop_path} alt={item.title} className={styles.intro__bg} />
                        <h2 className={styles.intro__title}>{item.title || "Sarlavha berilmagan"}</h2>
                        <p className={styles.intro__text}>{item.overview || "Izoh topilmadi!"}</p>
                        <Button id={item.id} />
                    </SwiperSlide>
                ))}
                <div className={classNames(styles.intro__next,"intro__next")} slot='container-end'>
                    <p className={styles.intro__next_text}>Следующий</p>
                    <h3 className={styles.intro__next_title}>{data[nextSlide].title || "Sarlavha berilmagan"}</h3>
                    <img src={import.meta.env.VITE_DB_ORG + data[nextSlide].backdrop_path} alt={data[0].title} className={styles.intro__next_image}></img>
                    <div className={styles.intro__next_line} ref={line}></div>
                </div>
            </Swiper>
        </div>
    )
}

export default Intro