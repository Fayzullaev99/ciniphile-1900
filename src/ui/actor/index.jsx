import user from '../../images/user.png'
import styles from './actor.module.scss'

function Actor({data}) {
    return (
        <div className={styles.actor}>
            <img src={data.profile_path ? import.meta.env.VITE_DB_W500 + data.profile_path : user} alt="actor" className={styles.actor__image} />
            <p className={styles.actor__name}>{data.name}</p>
        </div>
    )
}

export default Actor