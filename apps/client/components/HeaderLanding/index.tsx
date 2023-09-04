'use client'
import Link from 'next/link'
import styles from './style.module.scss'
import { useRef } from 'react'

export default function HeaderLanding () {
  const menu = useRef<HTMLDivElement>(null)

  function toggleMenu () {
    menu.current?.classList.toggle(styles['header__menu--active'])
  }

  return (
    <header className={styles.header}>
      <span onClick={toggleMenu}>🍔</span>
      <span>logo</span>
      <nav className={styles.header__menu} ref={menu}>
        <header className={styles['header__menu-header']}>
          <span>Logo</span>
          <button>✖️</button>
        </header>
        <details className={styles['header__menu-details']}>
          <summary className={styles['header__menu-summary']}>
            Información
          </summary>
          <ul className={styles['header__menu-list']}>
            <li className={styles['header__menu-item']}>
              <Link href="#">Quienes somos</Link>
            </li>
            <li className={styles['header__menu-item']}>
              <Link href="#">Avisos legales</Link>
            </li>
            <li className={styles['header__menu-item']}>
              <Link href="#">Contacto</Link>
            </li>
          </ul>
        </details>
        <button>Iniciar Sesion</button>
      </nav>
    </header>
  )
}
