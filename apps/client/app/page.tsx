/* eslint-disable @next/next/no-img-element */
'use client'
import HeaderLanding from 'components/HeaderLanding'
import styles from './page.module.scss'
import { AuthForm } from 'components/AuthForm'
import { useState } from 'react'
import Link from 'next/link'
import { Icons } from 'components/Icons'

export default function Index () {
  const [isLogin, setIsLogin] = useState({
    login: false,
    register: false
  })

  function handleAuth (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const value = e.currentTarget.value
    setIsLogin((s) => {
      return { ...s, [value]: true }
    })
  }

  return (
    <section className={styles.home}>
      {isLogin.login || isLogin.register
        ? <AuthForm type={isLogin.login ? 'login' : 'register'} />
        : null}
       <HeaderLanding setIsLogin={setIsLogin} handleAuth={handleAuth}/>
       <main className={styles.home__main}>
          <section className={styles.home__calltoaction}>
            <div className={styles.home__gradient}></div>
            <div className={styles.home__text}>
              <h1 className={styles.home__title}>
                Mismos gustos,<br/> nuevas <b>oportunidades</b>
              </h1>
              <h2 className={styles.home__description}>
                Personaliza tu perfil y comienza a <br/> chatear
              </h2>
            </div>
            <img
              className={styles.home__image}
              src='images/intro-landing.png'
              alt="laptop con prueba de la aplicacion"
            />
            <div className={styles.home__buttonsD}>
              <button className='btn' onClick={handleAuth} value="register">Crear Cuenta</button>
            </div>
            <div className={styles.home__buttonsM}>
              <h3>Crea una cuenta</h3>
              <button className='btn' onClick={handleAuth} value="register">Registrate</button>
              <button className='btn' onClick={handleAuth} value="login">Iniciar Sesion</button>
              <Link
              href="#"
              className={styles['header__menu-authG']}
              >
                iniciar sesión con google
              </Link>
            </div>
          </section>

          <section className={styles.home__features}>
            <article className={styles.home__card}>
              <h2 className={styles['home__card-title']}>Haz amistades!</h2>
              <Icons.Chat width={40} height={40}/>
            </article>
            <article className={styles.home__card}>
              <h2 className={styles['home__card-title']}>Encuentra el amor!</h2>
              <Icons.Heart width={40} height={40}/>
            </article>
            <article className={styles.home__card}>
              <h2 className={styles['home__card-title']}>Protege tu identidad</h2>
              <Icons.Eye width={20} height={10}/>
            </article>
          </section>
       </main>
       <div className={styles.home__texture}>
       </div>
    </section>
  )
}
