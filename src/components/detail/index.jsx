import { useParams } from 'react-router-dom'
import play from '../../images/play.png'
import user from '../../images/user.png'
import styles from './detail.module.scss'
import useGetData from '../../hooks/useGetData'
import Loader from '../../ui/loader/Loader'
import Recommend from '../recommend'
import Container from '../../layout/container'
import Thriller from '../thriller'
import { useState } from 'react'

function Detail() {
  const [thriller,setThriller] = useState(false)
  const { id } = useParams()
  const [data] = useGetData(`movie/${id}`, id)
  const [casts] = useGetData(`movie/${id}/credits`, id)
  const [video] = useGetData(`movie/${id}/videos`,id)
  if (!data || !casts || !video) return <Loader />
  return (
    <>
      <section className={styles.detail}>
        <img src={import.meta.env.VITE_DB_ORG + data.backdrop_path} alt="bg" className={styles.detail__bg} />
        <img src={import.meta.env.VITE_DB_ORG + data.poster_path} alt="poster" className={styles.detail__image} />
        <div className={styles.detail__content}>
          <h2 className={styles.detail__title}>{data.title || "no title"}</h2>
          <p className={styles.detail__text}>{data.overview || "no text"}</p>
          <ul className={styles.detail__genres}>
            <li className={styles.detail__genre}>{new Date(data.release_date || data.first_air_date).getFullYear()}</li>
            {data.genres.map((el) => (
              <li className={styles.detail__genre} key={el.id}>{el.name}</li>
            ))}
            {data.runtime && <li className={styles.detail__genre}>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</li>}
          </ul>
          <button className={styles.detail__play} onClick={()=>setThriller(true)}>
            <img src={play} alt='play' />
            <span>Смотерть трейлер</span>
          </button>
          <p className={styles.detail__role}>В главных ролях</p>
          <div className={styles.detail__actors}>
            {casts.cast.slice(0, 4).map((el) => (
              <div className={styles.detail__actor} key={el.id}>
                <img src={el.profile_path ? import.meta.env.VITE_DB_W500 + el.profile_path : user} alt="actor" className={styles.detail__actor_image} />
                <p className={styles.detail__actor_name}>{el.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Container>
        <div className={styles.detail__info}>
          <div className={styles.detail__info_box}>
            <h4 className={styles.detail__info_title}>Бюджет</h4>
            <p className={styles.detail__info_text}>${data.budget.toLocaleString()}</p>
          </div>
          <div className={styles.detail__info_box}>
            <h4 className={styles.detail__info_title}>Сборы</h4>
            <p className={styles.detail__info_text}>${data.revenue.toLocaleString()}</p>
          </div>
          <div className={styles.detail__info_box}>
            <h4 className={styles.detail__info_title}>Статус</h4>
            <p className={styles.detail__info_text}>{data.status}</p>
          </div>
          <div className={styles.detail__info_box}>
            <h4 className={styles.detail__info_title}>Исходное название</h4>
            <p className={styles.detail__info_text}>{data.tagline || "no name"}</p>
          </div>
        </div>
        <Recommend id={id} />
      </Container>
      <Thriller video={video} thriller={thriller} setThriller={setThriller} />
    </>
  )
}

export default Detail