/* eslint-disable @next/next/no-img-element */
import style from './style.module.scss'

interface Props {
  admin: boolean
}

export function Messages ({ admin }: Props) {
  const isAdmin = admin

  return isAdmin
    ? (
      <div className={style.message__A}>
        <div className={style.message__content}>
          <p className={style.message__text}>Hola, ¿cómo estás?</p>
          <p className={style.message__time}>12:00</p>
          <p className={style.message__status}>Visto</p>
        </div>
      </div>
      )
    : (
      <div className={style.message__B}>
        <div className={style.message__container}>
          <figure className={style.message__figure}>
            <img className={style.message__avatar} src="https://picsum.photos/200" alt="avatar"/>
          </figure>
          <div className={style.message__content}>
            <p className={style['message-text']}>Bien y tu?, como va tu dia?</p>
            <p className={style.message__time}>12:00</p>
          </div>
        </div>
      </div>
      )
}
