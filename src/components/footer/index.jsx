import styles from './footer.module.scss'
import { footerList } from '../../helpers'
import { Link } from 'react-router-dom'
import proweb from '../../images/proweb.png'
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__list}>
        {footerList.map((icon)=>(
          <Link key={icon.id} to={icon.path} className={styles.footer__link}>
            <img src={icon.image} alt="icon" />
          </Link>
        ))}
      </div>
      <div className={styles.footer__info}>
        <p className={styles.footer__text}>© 2022 CINEPHILE. Может содержать информацию, не предназначенную для несовершеннолетних</p>
        <p className={styles.footer__text}>Данные получены с сайта themoviedb.org</p>
      </div>
      <img src={proweb} alt="proweb" className={styles.footer__proweb} />
    </footer>
  )
}

export default Footer