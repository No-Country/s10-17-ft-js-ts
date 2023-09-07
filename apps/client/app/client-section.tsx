/* eslint-disable @next/next/no-img-element */
'use client'
// import Image from 'next/image'
import { useState } from 'react'
import { AuthForm } from 'components/AuthForm'
import styles from './page.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'hooks/useSession'

export function ClientSection () {
  const [showForm, setShowForm] = useState<'login' | 'register' | null>(null)
  const { session } = useSession()
  const router = useRouter()

  const handleAuth = (type: 'login' | 'register') => {
    if (session?.access_token) {
      router.push('/home')
    } else setShowForm(type)
  }

  return (
      <section className={styles.home__calltoaction}>
        {showForm ? <AuthForm type={showForm} /> : null }
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
              src='/images/intro-landing.png'
              alt="laptop con prueba de la aplicacion"
            />
            <div className={styles.home__buttonsD}>
              <button className='btn' onClick={() => handleAuth('register')} value="register">Crear Cuenta</button>
            </div>
            <div className={styles.home__buttonsM}>
              <h3>Crea una cuenta</h3>
              <button className='btn' onClick={() => handleAuth('register')} value="register">Registrate</button>
              <button className='btn' onClick={() => handleAuth('login')} value="login">Iniciar Sesion</button>
              <Link
              href="#"
              className={styles['header__menu-authG']}
              >
                iniciar sesión con google
              </Link>
            </div>
          </section>
  )
}
