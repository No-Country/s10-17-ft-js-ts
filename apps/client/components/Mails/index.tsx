/* eslint-disable @next/next/no-img-element */
import style from './style.module.scss'

export function Mails () {
  return (
    <section className={style.mails}>
      <p>Mailbox</p>

      <div className={style.mails__matches}>
        <h3 className={style['mails__matches-title']}>Matches</h3>
        <ul className={style['mails__matches-list']}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <img
                  className={style['mails__message-avatar']}
                  src="https://avatars.githubusercontent.com/u/1182328?v=5"
                  alt="User avatar"
                />
            </li>
          ))}
        </ul>
      </div>

      <div className={style.mails__messages}>
        <h3 className={style['mails__messages-title']}>Messages</h3>
        <ul className={style['mails__messages-list']}>
          {Array.from({ length: 9 }).map((_, i) => (
            <li key={i}>
              <figure>
                <span className={style['mails__message-status']}></span>
                <img
                  className={style['mails__message-avatar']}
                  src="https://avatars.githubusercontent.com/u/1182328?v=5"
                  alt="User avatar"
                />
              </figure>

              <h3 className={style['mails__message-user']}>
                User name
              </h3>
              <p className={style['mails__message-text']}>
                Ejemplo de mensaje
              </p>
              <span className={style['mails__message-date']}>
                1 day ago
              </span>
              <span className={style['mails__message-notifications']}>
                1
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
