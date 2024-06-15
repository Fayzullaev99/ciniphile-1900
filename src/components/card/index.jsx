import styles from './card.module.scss'
import noImage from '../../images/no-image.png'
import { useNavigate } from 'react-router-dom'

function Card({data}) {
  const navigate = useNavigate()
  return (
    <div className={styles.card} onClick={()=>navigate(`/detail/${data.id}`)}>
        <img src={data.backdrop_path ? import.meta.env.VITE_DB_ORG + data.backdrop_path : noImage} alt={data.title || data.name} className={styles.card__image} />
        <div className={styles.card__title}>{data.title || data.name}</div>
    </div>
  )
}

export default Card