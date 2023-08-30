import { Mails } from 'components/Mails'
import style from './page.module.scss'
import { Chat } from 'components/Chat'

export default function Index () {
  return (
    <main className={style.messages}>
      <Mails/>
      <Chat/>
    </main>
  )
}
