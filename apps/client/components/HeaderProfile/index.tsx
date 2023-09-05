/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import style from './style.module.scss'
import { usePathname } from 'next/navigation'

export default function HeaderProfile () {
  const pathname = usePathname()
  return (
    pathname !== '/profile'
      ? (
      <header className={style.header}>
      <div className={style.header__title}>
        <img src="/images/logo.svg" alt="logo" />
        <h1>Perfil</h1>
      </div>
      <div className={style.header__options}>
        <ul className={style['header__options-list']}>
          <li className={`${style.header__option} ${pathname === '/profile/aboutme' ? `${style['header__option--selected']}` : ''}`}>
            <Link href="/profile/aboutme">Sobre ti</Link>
          </li>
          <li className={`${style.header__option} ${pathname === '/profile/pins' ? `${style['header__option--selected']}` : ''}`}>
            <Link href="/profile/pins">Mis pines</Link>
          </li>
          <li className={`${style.header__option} ${pathname === '/profile/preferences' ? `${style['header__option--selected']}` : ''}`}>
            <Link href="/profile/preferences">Tus preferencias</Link>
          </li>
        </ul>
        <button className={style.header__button}>
          Guadar cambios
        </button>
      </div>
    </header>
        )
      : null
  )
}
