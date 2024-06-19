import classNames from 'classnames'
import close from '../../images/close.svg'
import styles from './info.module.scss'
import Button from '../../ui/button'
import Loader from '../../ui/loader/Loader'
import Actor from '../../ui/actor'

function InfoBlock({ data, casts }) {
    if (!data || !casts) return <Loader />
    return (
        <section className={data ? classNames(styles.info, styles.active) : styles.info}>
            <img src={import.meta.env.VITE_DB_ORG + data.backdrop_path} alt={data.title || data.name} className={styles.info__bg} />
            <button className={styles.info__cancel}>
                <img src={close} alt="close" className={styles.info__cancel_icon} />
            </button>
            <div className={styles.info__content}>
                <h2 className={styles.info__title}>{data.title || data.name}</h2>
                <p className={styles.info__text}>{data.overview}</p>
                <ul className={styles.info__genres}>
                    <li className={styles.info__genre}>{new Date(data.release_date || data.first_air_date).getFullYear()}</li>
                    {data.genres.map((el) => (
                        <li className={styles.info__genre} key={el.id}>{el.name}</li>
                    ))}
                    {data.runtime && <li className={styles.info__genre}>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</li>}
                </ul>
                <div className={styles.info__actors}>
                    {casts.cast.slice(0, 4).map((el) => (
                        <Actor data={el} key={el.id} />
                    ))}
                </div>
                <Button />
            </div>
        </section>
    )
}

export default InfoBlock