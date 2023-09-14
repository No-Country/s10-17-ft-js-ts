/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import style from './style.module.scss'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useChatsStore } from 'store/chats'
import { useSession } from 'hooks/useSession'

interface Props {
  setOpenChat: () => void
}

export function Mails ({ setOpenChat }: Props) {
  const router = useRouter()
  const { getChats, chats } = useChatsStore()
  const { session } = useSession()

  function openProfile () {
    router.push('/profile')
  }

  useEffect(() => {
    if (session) getChats(session.access_token)
  }, [])

  return (
    <section className={style.mails}>
      <div className={style.mails__matches}>
        <div className={style['mails__matches-header']}>
          <h2 className={style['mails__matches-title']}>Matches</h2>
          <Link href="/messages/matches">Ver más</Link>
        </div>
        <ul className={style['mails__matches-list']}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} onClick={setOpenChat} className={style.mails__match}>
              <img
                  onClick={openProfile}
                  className={style['mails__message-avatar']}
                  src="https://picsum.photos/200"
                  alt="User avatar"
                />
            </li>
          ))}
        </ul>
      </div>

      <div className={style.mails__messages}>
        <h2 className={style['mails__messages-title']}>Mensajes</h2>
        <ul className={style['mails__messages-list']}>
          {chats && chats.map((item, index) => (
            <li key={index} className={style.mails__message}>
              <figure className={style['mails__message-photo']}>
                <span className={style['mails__message-status']}></span>
                <img
                  onClick={openProfile}
                  className={style['mails__message-avatar']}
                  src="https://picsum.photos/200"
                  alt="User avatar"
                />
              </figure>

              <div className={style['mails__message-content']}>
                <div className={style['mails__message-info']} onClick={setOpenChat}>
                  <h3 className={style['mails__message-user']}>
                    Nombre del match
                  </h3>
                  <p className={style['mails__message-text']}>
                    Vista previa del mensaje
                  </p>
                </div>
                <div className={style['mails__message-info']}>
                  <span className={style['mails__message-time']}>
                    18:45
                  </span>
                  <span className={style['mails__message-notifications']}>
                    1
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
