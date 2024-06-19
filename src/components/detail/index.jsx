import { useParams } from 'react-router-dom'
import play from '../../images/play.png'
import user from '../../images/user.png'
import styles from './detail.module.scss'
import Loader from '../../ui/loader/Loader'
import Recommend from '../recommend'
import Container from '../../layout/container'
import Thriller from '../thriller'
import { useEffect, useState } from 'react'
import Actor from '../../ui/actor'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/dataSlice'

function Detail() {
  const [thriller,setThriller] = useState(false)
  const { type, id } = useParams()
  const dispatch = useDispatch()
  const {infoMovie, infoSerie, castsMovie, castsSerie, recommendMovie, recommendSerie, videoMovie, videoSerie} = useSelector(state => state.data)

  useEffect(()=>{
    if (type && id) {
      dispatch(fetchData(`${type}/${id}`))
      dispatch(fetchData(`${type}/${id}/credits`))
      dispatch(fetchData(`${type}/${id}/recommendations`))
      dispatch(fetchData(`${type}/${id}/videos`))
    }
  },[type,id])

  const data = type == 'movie' ? infoMovie : infoSerie
  const casts = type == 'movie' ? castsMovie : castsSerie
  const recommend = type == 'movie' ? recommendMovie : recommendSerie
  const video = type == 'movie' ? videoMovie : videoSerie

  if (!data || !casts || !video || !recommend) return <Loader />
  console.log(video);
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
              <Actor data={el} key={el.id} />
            ))}
          </div>
        </div>
      </section>
      <Container>
        <div className={styles.detail__info}>
          <div className={styles.detail__info_box}>
            <h4 className={styles.detail__info_title}>Бюджет</h4>
            <p className={styles.detail__info_text}>${data?.budget?.toLocaleString()}</p>
          </div>
          <div className={styles.detail__info_box}>
            <h4 className={styles.detail__info_title}>Сборы</h4>
            <p className={styles.detail__info_text}>${data?.revenue?.toLocaleString()}</p>
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
        <Recommend data={recommend} />
      </Container>
      {video.results.length && <Thriller video={video} thriller={thriller} setThriller={setThriller} />}
    </>
  )
}

export default Detail