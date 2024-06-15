import styles from './notfound.module.scss'
import notfound from '../../images/notfound.gif'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.notfound}>
      <img src={notfound} alt="notfound page" className={styles.notfound__image} />
      <div className={styles.notfound__info}>
        <h3 className={styles.notfound__title}>Xatolik yuz berdi,</h3>
        <p className={styles.notfound__text}>Kechirasiz siz izlayotgan sahifa topilmadi!</p>
      </div>
      <button className={styles.notfound__button} onClick={()=>navigate('/')} >Bosh sahifaga qaytish</button>
    </div>
  )
}

export default NotFound