/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import style from './style.module.scss'

export default function HeaderProfile () {
  return (
    <header className={style.header}>
      <div className={style.header__title}>
        <img src="/images/logo.svg" alt="logo" />
        <h1>Perfil</h1>
      </div>
      <div className={style.header__options}>
        <ul className={style['header__options-list']}>
          <li className={style.header__option}>
            <Link href="/profile/aboutme">Sobre ti</Link>
          </li>
          <li className={style.header__option}>
            <Link href="/profile/pins">Mis pines</Link>
          </li>
          <li className={style.header__option}>
            <Link href="/profile/preferences">Tus preferencias</Link>
          </li>
        </ul>
        <button className={style.header__button}>
          Guadar cambios
        </button>
      </div>
    </header>
  )
}
