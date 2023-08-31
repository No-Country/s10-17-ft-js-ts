import styles from './page.module.scss'
import { AuthForm } from 'components/AuthForm'

export default async function Index () {
  return (
    <main className={styles.page}>
      <AuthForm type='login' />
    </main>
  )
}
