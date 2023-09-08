/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import style from './style.module.scss'
import { usePathname } from 'next/navigation'
import { Icons } from 'components/Icons'

export default function HeaderProfile () {
  const pathname = usePathname()
  return (
    pathname !== '/profile'
      ? (
      <header className={style.header}>
        <div className={style.header__control}>
          <div className={style.header__title}>
            <Icons.User width={40} height={40} />
            <h1>Perfil</h1>
          </div>

          <button className={`${style.header__save} btn`} disabled={true}>
            Guadar cambios
          </button>
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
        </div>
      </header>
        )
      : null
  )
}
