/* eslint-disable no-unused-vars */
'use client'
import Link from 'next/link'
import styles from './style.module.scss'
import { Dispatch, SetStateAction, useRef } from 'react'
import { Icons } from 'components/Icons'

interface Props {
  setIsLogin: Dispatch<SetStateAction<{
    login: boolean
    register: boolean
  }>>
  handleAuth: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function HeaderLanding ({ setIsLogin, handleAuth }: Props) {
  const menu = useRef<HTMLDivElement>(null)

  function toggleMenu () {
    menu.current?.classList.toggle(styles['header__menu--active'])
  }

  return (
    <header className={styles.header}>
      <span onClick={toggleMenu} className={styles['header__menu-burger']}>
        <Icons.BurgerMenu width={40} height={40}/>
      </span>
      <span>
        <Icons.LogoHome width={40} height={40}/>
      </span>
      <nav className={styles.header__menu} ref={menu}>
        <header className={styles['header__menu-header']}>
          <span>
            <Icons.LogoHome width={40} height={40}/>
          </span>
          <button onClick={toggleMenu}>
            <Icons.Close width={40} height={40}/>
          </button>
        </header>
        <main className={styles['header__menu-main']}>
          <details className={styles['header__menu-details']}>
            <summary className={styles['header__menu-summary']}>
              <Icons.Info width={40} height={40}/>
              <p>Información</p>
            </summary>
            <ul className={styles['header__menu-list']}>
              <li className={styles['header__menu-item']}>
                <Link href="/aboutus">Quienes somos</Link>
              </li>
              <li className={styles['header__menu-item']}>
                <Link href="legacy">Avisos legales</Link>
              </li>
              <li className={styles['header__menu-item']}>
                <Link href="/contact">Contacto</Link>
              </li>
            </ul>
          </details>
          <div className={styles['header__menu-auth']}>
            <div className={styles['header__menu-authB']}>
              <button
                value='login'
                onClick={handleAuth}
                className='btn'>Iniciar sesion</button>
              <button
                value='register'
                onClick={handleAuth}
                className='btn'>Registrate</button>
            </div>
            <Link
              href="#"
              className={styles['header__menu-authG']}
            >iniciar sesión con google</Link>
          </div>
        </main>
      </nav>
    </header>
  )
}
