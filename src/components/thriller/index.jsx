import classNames from 'classnames'
import cancel from '../../images/close.svg'
import styles from './thriller.module.scss'
import YouTube from 'react-youtube'

function Thriller({ video, thriller, setThriller }) {
    return (
        <section className={thriller ? classNames(styles.thriller, styles.active) : styles.thriller}>
            <div className={styles.thriller__card}>
                <button className={styles.thriller__cancel} onClick={()=>setThriller(false)}>
                    <img src={cancel} alt="cancel" />
                </button>
                <YouTube
                    videoId={video.results[0].key}
                    className={styles.thriller__video}
                    opts={{width:'1000px',height:'700px'}}
                />
            </div>
        </section>
    )
}

export default Thriller