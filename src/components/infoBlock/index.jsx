import classNames from 'classnames'
import close from '../../images/close.svg'
import styles from './info.module.scss'
import Button from '../../ui/button'
import useGetData from '../../hooks/useGetData'
import Loader from '../../ui/loader/Loader'

function InfoBlock({active,type}) {
    const [data] = useGetData(`${type == 'movie' ? 'movie/' + active : 'tv/' + active}`,active)
    const [casts] = useGetData(`${type == 'movie' ? 'movie/' + active + '/credits' : 'tv/' + active + '/credits'}`,active)
    if (!data || !casts) return <Loader />
  return (
    <section className={active ? classNames(styles.info,styles.active) : styles.info}>
        <img src={import.meta.env.VITE_DB_ORG + data.backdrop_path} alt={data.title || data.name} className={styles.info__bg} />
        <button className={styles.info__cancel}>
            <img src={close} alt="close" className={styles.info__cancel_icon} />
        </button>
        <div className={styles.info__content}>
            <h2 className={styles.info__title}>{data.title || data.name}</h2>
            <p className={styles.info__text}>{data.overview}</p>
            <ul className={styles.info__genres}>
                <li className={styles.info__genre}>{new Date(data.release_date || data.first_air_date).getFullYear()}</li>
                {data.genres.map((el)=>(
                    <li className={styles.info__genre} key={el.id}>{el.name}</li>
                ))}
                {data.runtime && <li className={styles.info__genre}>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</li>}
            </ul>
            <div className={styles.info__actors}>
                {casts.cast.slice(0,4).map((el)=>(
                    <div className={styles.info__actor} key={el.id}>
                    <img src={import.meta.env.VITE_DB_W500 + el.profile_path} alt="actor" className={styles.info__actor_image} />
                    <p className={styles.info__actor_name}>{el.name}</p>
                </div>
                ))}
            </div>
            <Button id={active} />
        </div>
    </section>
  )
}

export default InfoBlock