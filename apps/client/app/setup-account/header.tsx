'use client'
import Image from 'next/image'
import style from './style.module.scss'
import { useState } from 'react'
import { Icons } from 'components/Icons'
import { useSession } from 'hooks/useSession'

const { BurgerMenu, Close } = Icons

export function Header () {
  const { removeSession } = useSession()
  const [showMenu, setShowMenu] = useState(false)

  const toggleShowMenu = () => setShowMenu(!showMenu)

  return (
    <header className={style.header}>
      <Image alt='Logo' className={style.header__logo} width={200} height={40} src='/images/wavebig.svg' />
      <button className={style.header__logout} onClick={removeSession}>Salir</button>

      <div onClick={toggleShowMenu} className={style.header__menu}>
        {!showMenu ? <BurgerMenu width={40} height={40} /> : <Close width={40} height={40} />}
      </div>

      {
        showMenu
          ? (
          <div className={style.header__menuContent}>
            <button className={style.header__logout} onClick={removeSession}>Salir</button>
          </div>
            )
          : null
      }
    </header>
  )
}
