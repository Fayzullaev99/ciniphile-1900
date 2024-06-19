import Card from '../card'
import styles from './recommend.module.scss'

function Recommend({data}) {
  return (
    <div className={styles.recommend}>
        <h2 className={styles.recommend__title}>Рекомендации</h2>
        <div className={styles.recommend__list}>
          {data.results.slice(0,4).map((item)=>(
            <Card data={item} key={item.id} />
          ))}
        </div>
    </div>
  )
}

export default Recommend