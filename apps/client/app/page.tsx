import HeaderLanding from 'components/HeaderLanding'
import styles from './page.module.scss'
import { AuthForm } from 'components/AuthForm'

export default async function Index () {
  const isLogin = false
  return (
    <main className={styles.page}>
      {isLogin && <AuthForm type='login' />}
      <HeaderLanding/>
    </main>
  )
}
