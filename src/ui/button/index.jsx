import styles from './button.module.scss'
import more from '../../images/more.png'
import { useNavigate } from 'react-router-dom'

function Button({id}) {
  const navigate = useNavigate()
  return (
    <div className={styles.more} onClick={()=>navigate(`/detail/${id}`)}>
        <img src={more} alt="more icon" className={styles.more__icon} />
        <span className={styles.more__text} >Подробнее</span>
    </div>
  )
}

export default Button