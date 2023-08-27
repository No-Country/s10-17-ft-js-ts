/* eslint-disable @next/next/no-img-element */
'use cliet'
import style from './style.module.scss'

export default function UserMatchCard () {
  return (
    <div className={style.user}>
      <div className={style.user__info}>
        <img className={style.user__photo} src="https://avatars.githubusercontent.com/u/499550?v=4" alt="User photo" />
        <div className={style.user__details}>
          <h2 className={style.user__name}>User name</h2>
          <p className={style.user__location}>User location</p>
        </div>
      </div>
    </div>
  )
}
