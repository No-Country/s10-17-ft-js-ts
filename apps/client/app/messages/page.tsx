'use client'
import { Mails } from 'components/Mails'
import style from './page.module.scss'
import { Chat } from 'components/Chat'
import { useRef } from 'react'

export default function Index () {
  const chat = useRef<HTMLDivElement>(null)
  function handleOpenChat () {
    if (window.innerWidth < 1000) {
      if (!chat.current) return
      if (chat.current.style.display === 'flex') {
        chat.current.style.display = 'none'
        return
      }
      chat.current.style.display = 'flex'
    }
  }
  return (
    <main className={style.messages}>
      <Mails setOpenChat={handleOpenChat}/>
      <Chat chat={chat} setOpenChat={handleOpenChat}/>
    </main>
  )
}
