'use client'
import Link from 'next/link'
import style from './style.module.scss'
import { useRef } from 'react'

export default function Header () {
  const menu = useRef<HTMLDivElement>(null)

  const handleMenu = () => {
    if (menu.current) {
      menu.current.classList.toggle(style['header__menu--active'])
    }
  }

  return (
    <header className={style.header}>
      <span
        onClick={handleMenu}
        className={style['header__btn-menu']}
      >🍔</span>
      <span>Logo</span>
      <Link href={'#'}>📩</Link>

      <nav className={style.header__menu} ref={menu}>
        <header className={style['header__menu-back']}>
          <h3 className={style.header__username}>username</h3>
          <span
            onClick={handleMenu}
          >❌</span>
        </header>
        <div className={style['header__menu-options']}>
          <ul>
            <li>
              <Link href={'#'}>Perfil</Link>
            </li>
            <li>
              <Link href={'#'}>Configuración</Link>
            </li>
            <li>
              <Link href={'#'}>Ayuda</Link>
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
              <Link href={'#'}>Salir</Link>
            </li>
          </ul>
        </div>
        <Link href={'#'}>Cerrar sesión</Link>
      </nav>
    </header>
  )
}
