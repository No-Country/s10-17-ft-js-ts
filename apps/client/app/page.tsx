import styles from './page.module.scss'
import { Register } from 'components/Register'
export default async function Index () {
  return (
    <main className={styles.page}>
      <Register />
    </main>
  )
}
