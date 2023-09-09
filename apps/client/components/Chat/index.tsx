/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import style from './style.module.scss'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Messages } from 'components/Messages'
import { Icons } from 'components/Icons'

interface Props {
  chat: React.RefObject<HTMLDivElement>
  setOpenChat: () => void
}

export function Chat ({ chat, setOpenChat }: Props) {
  const [message, setMessage] = useState('')
  const [openEmoticons, setOpenEmoticons] = useState(false)

  function handleSend () {
    if (message.length !== 0) {
      console.log(message)
    }
  }

  // TODO: Buscar tipo de emoji
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSelectEmoji (emoji: any) {
    setMessage(message + emoji.native)
  }

  return (
    <section className={style.chat} ref={chat}>
      <div className={style.chat__back} onClick={setOpenChat}>
        <span>⬅️</span>
        <p>Volver</p>
      </div>

      <div className={style.chat__content}>
        <div className={style.chat__header}>
          <img className={style.chat__avatar} src="https://picsum.photos/200" alt="avatar"/>
          <h3 className={style.chat__info}>
            <span className={style.chat__name}>Nombre del match</span>
            <span className={style.chat__age}>32</span>
          </h3>
        </div>
        <div className={style.chat__messages}>
          {
            (
              <>
                <Messages admin={false}/>
                <Messages admin={true}/>
              </>
            )
          }
        </div>
          <div className={style.chat__input}>
            <div className={style['chat__input-container']}>
              <input
                className={style['chat__input-text']}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className={style.chat__emoticons}>
                {openEmoticons &&
                <div className={style['chat__emoticons-picker']}>
                  <Picker
                    data={data}
                    onEmojiSelect={handleSelectEmoji}
                  />
                </div>
                }
                <span onClick={() => setOpenEmoticons(e => !e)}>
                  <Icons.Emoticon width={30} height={30}/>
                </span>
              </div>
            </div>
            <button className='btn-send' onClick={handleSend}>➡️</button>
          </div>
      </div>
    </section>
  )
}
