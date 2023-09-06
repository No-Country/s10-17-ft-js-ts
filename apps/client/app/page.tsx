import styles from './page.module.scss'
import { Icons } from 'components/Icons'
import { ClientSection } from './client-section'
import HeaderLanding from 'components/HeaderLanding'

export default function Index () {
  return (
    <section className={styles.home}>
      <HeaderLanding />
       <main className={styles.home__main}>
          <ClientSection/>
          <section className={styles.home__features}>
            <article className={styles.home__card}>
              <h2 className={styles['home__card-title']}>Haz amistades!</h2>
              <Icons.Chat width={40} height={40}/>
            </article>
            <article className={styles.home__card}>
              <h2 className={styles['home__card-title']}>Encuentra el amor!</h2>
              <Icons.Heart width={40} height={40}/>
            </article>
            <article className={styles.home__card}>
              <h2 className={styles['home__card-title']}>Protege tu identidad</h2>
              <Icons.Eye width={20} height={10}/>
            </article>
          </section>
       </main>
       <div className={styles.home__texture}>
       </div>
    </section>
  )
}
