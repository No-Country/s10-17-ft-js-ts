'use client'
import { PopupModal } from 'components/PopupModal'
import { useState, useRef } from 'react'
import style from './style.module.scss'
import { Register } from './Register'
import { Login } from './Login'
import { EmailValidation } from './EmailValidation'

export function AuthForm ({ type }: { type: 'login' | 'register' | 'validate' }) {
  const [typeForm, setTypeForm] = useState<'login' | 'register' | 'validate'>(type)
  const email = useRef<string | null>('hola@123.com')

  const showValidationForm = (emailData: string) => {
    email.current = emailData
    setTypeForm('validate')
  }
  const toggleTypeForm = () => setTypeForm(typeForm === 'login' ? 'register' : 'login')

  if (typeForm === 'validate' && email.current) {
    return (
      <PopupModal>
      <div className={style.container}>
        <h2>Verificación</h2>
        <p className={style.container__ask}>Por favor, ingresa el código que te hemos enviado a <b>{email.current}</b></p>
        <EmailValidation email={email.current} />
        <small className={style.container__toggle}>Por si acaso revisa la sección de spam.</small>
     </div>
    </PopupModal>
    )
  }

  return (
    <PopupModal>
      <div className={style.container}>
        <h2>{ typeForm === 'register' ? 'Crea una cuenta' : 'Inicia sesión'}</h2>
        {typeForm === 'register' ? <Register showValidationForm={showValidationForm} /> : <Login />}
        <p className={style.container__toggle}>{ typeForm === 'register' ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'} <span onClick={toggleTypeForm}>{ typeForm === 'register' ? 'Inicia sesión' : 'Regístrate'}</span></p>
      </div>
    </PopupModal>
  )
}
