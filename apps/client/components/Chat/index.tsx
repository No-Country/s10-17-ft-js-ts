/* eslint-disable @next/next/no-img-element */
import React from 'react'
import style from './style.module.scss'

interface Props {
  chat: React.RefObject<HTMLDivElement>
  setOpenChat: () => void
}

export function Chat ({ chat, setOpenChat }: Props) {
  return (
    <section className={style.chat} ref={chat}>
      <div className={style.chat__back} onClick={setOpenChat}>
        <span>⬅️</span>
        <p>Volver</p>
      </div>
      <div className={style.chat__content}>
        <div className={style['chat__content-header']}>
          <div className={style.chat__avatar}>
            <img src="https://picsum.photos/200" alt="avatar"/>
          </div>
        </div>
      </div>
    </section>
  )
}
