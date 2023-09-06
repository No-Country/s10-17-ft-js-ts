'use client'
import { PopupModal } from 'components/PopupModal'
import { useState, useRef, useEffect } from 'react'
import style from './style.module.scss'
import { Register } from './Register'
import { Login } from './Login'
import { EmailValidation } from './EmailValidation'
import { useSession } from 'hooks/useSession'
import { useRouter } from 'next/navigation'

export function AuthForm ({ type, email: initialEmail }: { type: 'login' | 'register' | 'validate', email?: string }) {
  const [typeForm, setTypeForm] = useState<'login' | 'register' | 'validate'>(type)
  const email = useRef<string | null>(initialEmail || null)
  const { session } = useSession()
  const router = useRouter()

  const showValidationForm = (emailData: string) => {
    email.current = emailData
    setTypeForm('validate')
  }
  const toggleTypeForm = () => setTypeForm(typeForm === 'login' ? 'register' : 'login')

  useEffect(() => {
    if (session?.access_token) {
      router.push('/home')
    }
  }, [session])

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
