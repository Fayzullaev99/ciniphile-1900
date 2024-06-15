import { useSelector } from 'react-redux'
import useGetData from '../../hooks/useGetData'
import Loader from '../../ui/loader/Loader'
import Card from '../card'
import styles from './recommend.module.scss'

function Recommend({id}) {
  const {tvInfo,movieInfo} = useSelector(state => state.data)
    if (!tvInfo || !movieInfo) return <Loader />
  return (
    <div className={styles.recommend}>
        <h2 className={styles.recommend__title}>Рекомендации</h2>
        <div className={styles.recommend__list}>
          {(tvInfo || movieInfo).results.slice(0,4).map((item)=>(
            <Card data={item} key={item.id} />
          ))}
        </div>
    </div>
  )
}

export default Recommend