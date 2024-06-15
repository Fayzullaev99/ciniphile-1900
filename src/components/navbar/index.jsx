import { Link, NavLink } from 'react-router-dom'
import Container from '../../layout/container'
import logo from '../../images/logo.png'
import search from '../../images/search.png'
import styles from './navbar.module.scss'
import classNames from 'classnames'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container className={styles.navbar__container}>
        <Link to="/" className={styles.navbar__logo}>
          <img src={logo} alt="logo" />
        </Link>
        <div className={styles.navbar__list}>
          <NavLink to="/" className={({isActive})=>isActive ? classNames(styles.navbar__link,styles.active) : styles.navbar__link}>Главная</NavLink>
          <NavLink to="/movies" className={({isActive})=>isActive ? classNames(styles.navbar__link,styles.active) : styles.navbar__link}>Фильмы</NavLink>
          <NavLink to="/series" className={({isActive})=>isActive ? classNames(styles.navbar__link,styles.active) : styles.navbar__link}>Сериалы</NavLink>
          <NavLink to="/search" className={({isActive})=>isActive ? classNames(styles.navbar__link,styles.active) : styles.navbar__link}><img src={search} alt="search" /></NavLink>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar