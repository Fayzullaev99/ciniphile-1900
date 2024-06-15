import classNames from 'classnames'
import styles from './container.module.scss'


function Container({children,className}) {
  return (
    <div className={classNames(styles.container,className)}>{children}</div>
  )
}

export default Container
