'use client'
import Link from 'next/link'
import styles from './style.module.scss'
import { useRef, useState } from 'react'
import { Icons } from 'components/Icons'
import { AuthForm } from 'components/AuthForm'

export default function HeaderLanding () {
  const [showForm, setShowForm] = useState<'login' | 'register' | null>(null)
  const menu = useRef<HTMLDivElement>(null)

  const handleAuth = (type: 'login' | 'register') => {
    setShowForm(type)
  }
  function toggleMenu () {
    menu.current?.classList.toggle(styles['header__menu--active'])
  }

  return (
    <header className={styles.header}>
      {showForm ? <AuthForm type={showForm} /> : null }
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
                onClick={() => handleAuth('login')}
                className='btn'>Iniciar sesion</button>
              <button
                value='register'
                onClick={() => handleAuth('register')}
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
