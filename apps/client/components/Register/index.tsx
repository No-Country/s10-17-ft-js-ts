'use client'
import { PopupModal } from 'components/PopupModal'
import { useState } from 'react'
import style from './style.module.scss'
import { Icons } from 'components/Icons'

const { Close } = Icons

export function Register () {
  const [isOpen, setIsOpen] = useState(true)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  if (!isOpen) return null

  return (
    <PopupModal>
      <div className={style.container}>
        <span className={style.close} onClick={() => setIsOpen(false)}><Close width={20} height={20} className={style.icon} /></span>
        <h2>Crea una cuenta</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <p>Inicia sesión con Google</p>
          <button className={style.submit} type='submit'>Registrarse</button>
        </form>
      </div>
    </PopupModal>
  )
}
