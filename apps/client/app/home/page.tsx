import style from './page.module.scss'
import { ClientPage } from './client-page'

export default function Index () {
  return (
    <main className={style.home}>
      <div className={style.home__matches}>
        <ClientPage />
      </div>
    </main>
  )
}
