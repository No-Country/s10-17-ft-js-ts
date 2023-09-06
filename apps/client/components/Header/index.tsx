'use client'
import Link from 'next/link'
import style from './style.module.scss'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Icons } from 'components/Icons'

export default function Header () {
  const menu = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const handleMenu = () => {
    if (menu.current) {
      menu.current.classList.toggle(style['header__menu--active'])
    }
  }

  function toggleTheme () {
    document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  }

  if (pathname === '/') return null

  else {
    return (
    <header className={`${style.header} ${pathname === '/messages' ? style['header--messages'] : ''}`}>
      <div className={style.header__btn} onClick={handleMenu}>
        <span className={style['header__btn-menu']}>
          <Icons.BurgerMenu width={40} height={40} />
        </span>
        {pathname !== '/messages' ? <p className={style['header__btn-menu--title']}>Mas</p> : null}
      </div>
      <span
        onClick={toggleTheme}
        className={style.header__logo}
      >
        <Icons.LogoHome width={40} height={40} />
      </span>

      <div>
        <ul className={style.header__options}>
          <li>
            <Link href={'/'} className={style.header__option}>
              <span className={style.header__icon}>🏠</span>
              {pathname !== '/messages' ? <p>Inicio</p> : null}
            </Link>
          </li>
          <li>
            <Link href={'/profile'} className={style.header__option}>
              <Icons.User2 width={40} height={40} />
              {pathname !== '/messages' ? <p>Perfil</p> : null}
            </Link>
          </li>
          <li>
            <Link href={'/home'} className={style.header__option}>
              <Icons.Home width={40} height={40} />
              {pathname !== '/messages' ? <p>Explorar?</p> : null}
            </Link>
          </li>
          <li>
            <Link href={'/messages'} className={style.header__option}>
              <Icons.Chat width={40} height={40} />
              {pathname !== '/messages' ? <p>Mensajes</p> : null}
            </Link>
          </li>
        </ul>
        <Link className={style['header__msg-mobile']} href={'/messages'}>
          <Icons.Chat width={40} height={40} />
        </Link>
      </div>

      <nav className={style.header__menu} ref={menu}>
        <header className={style['header__menu-back']}>
          <h3 className={style.header__username}>username</h3>
          <span
            onClick={handleMenu}
          >
            <Icons.Close width={40} height={40} />
          </span>
        </header>
        <div className={style['header__menu-options']}>
          <ul>
            <li>
              <Link className={style.header__perfil} href={'/profile'}>Perfil</Link>
            </li>
            <li>
              <Link href={'#'}>Configuración</Link>
            </li>
            <li>
              <Link href={'#'}>Notificaciones</Link>
            </li>
            <li>
              <Link href={'#'}>Quienes somos</Link>
            </li>
            <li>
              <Link href={'#'}>Avisos Legales</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href={'#'}>Cambiar cuenta</Link>
            </li>
            <li>
              <Link href={'/'}>Salir</Link>
            </li>
          </ul>
        </div>
        <Link className={style.header__logout} href={'#'}>Cerrar sesión</Link>
      </nav>
  </header>
    )
  }
}
