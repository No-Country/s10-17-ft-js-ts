/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useRef, useState } from 'react'
import style from './page.module.scss'
import handleScroll from '../../libs/handleScroll'
import { Icons } from 'components/Icons'
import Link from 'next/link'
import { useUserStore } from 'store/user'
import { useSession } from 'hooks/useSession'

export default function Index () {
  const isAdmin = true
  const pins = useRef<HTMLUListElement>(null)
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const { userState: user, getUser } = useUserStore()
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      const { user } = session
      if (user && user.id) {
        getUser(user?.id)
      }
    }
  }, [])

  useEffect(() => {
    if (pins.current?.scrollWidth) {
      setIsScroll(pins.current?.scrollWidth > pins.current?.clientWidth)
    }
  }, [isScroll])

  return (
    <main className={style.profile__container}>
      {isAdmin
        ? <div className={style.profile__edit}>
          <Link className='btn-second' href='/profile/aboutme'>Editar perfil</Link>
        </div>
        : null}
      <div className={style.user}>
        <div className={style.user__content}>
          <div className={style.user__info}>
            <img className={style.user__photo} src={user ? user.user?.avatar : 'https://i.pinimg.com/564x/6b/6f/4d/6b6f4d9b5b0b0b0b0b0b0b0b0b0b0b0b.jpg'} alt='user' />
            <div className={style.user__details}>
              <div className={style.user__name}>
                <span>
                  {user?.user?.gender === 'Hombre' && <Icons.Male width={40} height={40} />}
                  {user?.user?.gender === 'Mujer' && <Icons.Female width={40} height={40} />}
                  {user?.user?.gender === 'No binario' && <Icons.NotBinary width={40} height={40} />}
                </span>
                <h1>{user && user.user?.firstName}, {user && user.user?.lastName}</h1>
              </div>
              <div className={style.user__location}>
                <h2>
                  {'úbicacion'}
                </h2>
              </div>
            </div>
          </div>

          <div className={style.user__interests}>
            <h2 className={style['user__interests-title']}>{isAdmin ? 'Mis' : 'Sus'} intereses</h2>
            <ul className={style['user__interests-content']}>
              {user && user.user?.categorys.map((interest, index) => {
                if (interest.pins.length > 0) {
                  return (
                    <li key={index} className={style.user__interest}>
                      {interest.name}
                    </li>
                  )
                } else return null
              })}
            </ul>
          </div>

          <div className={style.user__pins}>
            <h2 className={style['user__pins-title']}>{isAdmin ? 'Mis' : 'Sus'} pines</h2>
            <ul className={style['user__pins-content']} ref={pins}>

              {user &&
                user.user?.categorys.map((category) => category.pins.map((pin, index) => {
                  return (
                    <li key={crypto.randomUUID() || index} className={style.user__pin} style={{ background: 'linear-gradient(45deg, rgb(186, 71, 71), rgb(33, 204, 164))' }}>
                      <img className={style['user__pin-photo']} src={pin.imgUrl} alt={pin.name} />
                    </li>
                  )
                }))}

            </ul>
            {isScroll && (
              <div className={style['user__pins-buttons']}>
                <button value='left' onClick={(event) => handleScroll(event, pins)}>
                  <Icons.Arrow width={20} height={20} />
                </button>
                <button value='right' onClick={(event) => handleScroll(event, pins)}>
                  <Icons.Arrow width={20} height={20} />
                </button>
              </div>
            )}
          </div>

          <div className={style.user__about}>
            <h2 className={style['user__about-title']}>Sobre {isAdmin ? 'mí' : `${(user && user.user?.firstName) + ', ' + (user && user.user?.lastName)}`}</h2>
            <p className={style['user__about-content']}>
              {user && user.user?.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
