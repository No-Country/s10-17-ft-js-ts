/* eslint-disable @next/next/no-img-element */
'use client'
import style from './style.module.scss'

// TODO: tipar user
interface User {
  name: string
  photo: string
  location: string
  interests: string[]
  pins: string[]
  about: string
}

export default function UserMatchCard ({ user }: { user: User }) {
  function handleLike () {
    console.log('Like')
  }

  function handleDislike () {
    console.log('Dislike')
  }

  return (
    <div className={style.user}>
      <div className={style.user__content}>
        <div className={style.user__info}>
          <img className={style.user__photo} src={user.photo} alt="User photo" />
          <div className={style.user__details}>
            <h2 className={style.user__name}>{user.name}</h2>
            <p className={style.user__location}>{user.location}</p>
          </div>
        </div>

        <div className={style.user__interests}>
          <h3 className={style['user__interests-title']}>Sus intereses</h3>
          <ul className={style['user__interests-content']}>
            {user.interests.map((interest, index) => (
              <li key={index} className={style.user__interest}>
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <div className={style.user__pins}>
          <h3 className={style['user__pins-title']}>Sus pines</h3>
          <ul className={style['user__pins-content']}>
            {user.pins.map((pin, index) => (
              <li key={index} className={style.user__pin} style={{ background: 'linear-gradient(45deg, rgb(186, 71, 71), rgb(33, 204, 164))' }}>
                <img className={style['user__pin-photo']} src={pin} alt="User pin" />
              </li>
            ))}
          </ul>
        </div>

        <div className={style.user__about}>
          <h3 className={style['user__about-title']}>Sobre {user.name}</h3>
          <p className={style['user__about-content']}>
            {user.about}
          </p>
        </div>
      </div>

      <div className={style.user__buttons}>
        <button onClick={handleDislike} className={style.user__button}>✖️</button>
        <button onClick={handleLike} className={style.user__button}>✅</button>
      </div>
    </div>
  )
}
