'use client'
import { PopupModal } from 'components/PopupModal'
import { useState } from 'react'
import style from './style.module.scss'
import { Icons } from 'components/Icons'
import { useFormFields } from 'hooks/useFormFields'
import { useValidator } from 'hooks/useValidation'

const { Close, Eye } = Icons

type Errors<T> = {
  [_key in keyof T]: string | undefined;
};

export function Register () {
  const [isOpen, setIsOpen] = useState(true)
  const { fields, handleChange } = useFormFields<{ password: string, email: string }>()
  const [errors, setErrors] = useState<Errors<typeof fields>>()
  const [showPassword, setShowPassword] = useState(false)
  const validateForm = useValidator()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const foundErrors = validateForm(fields)
    if (foundErrors) setErrors(foundErrors as Errors<typeof fields>)
    else setErrors(undefined)

    // Submit data
  }

  if (!isOpen) return null

  return (
    <PopupModal>
      <div className={style.container}>
        <span className={style.close} onClick={() => setIsOpen(false)}><Close width={20} height={20} className={style.icon} /></span>
        <h2>Crea una cuenta</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <span className={style.field}>
            <label htmlFor="email">Usuario</label>
            <input type="text" name="email" placeholder='Correo electrónico' className={errors?.email ? style.error : ''} onChange={handleChange} />
          </span>
          <span className={style.field}>
            <label htmlFor="password">Contraseña</label>
            <input type={showPassword ? 'text' : 'password'} name="password" className={errors?.password ? style.error : ''} placeholder='Crear contraseña' onChange={handleChange} />
            <Eye width={15} height={15} className={style.icon} onClick={togglePasswordVisibility}/>
            <small>Debe contener al menos 8 caracteres</small>
          </span>
          <p>Inicia sesión con Google</p>
          <button className={style.submit} type='submit'>Registrarse</button>
        </form>
      </div>
    </PopupModal>
  )
}
