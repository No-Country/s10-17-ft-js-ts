import style from './form.module.scss'
import { useEffect, useState } from 'react'
import { Icons } from 'components/Icons'
import { useFormFields } from 'hooks/useFormFields'
import { useValidator } from 'hooks/useValidation'

const { Eye } = Icons

type Errors<T> = {
  [_key in keyof T]: string | undefined;
};

export function Register ({ showValidationForm }: { showValidationForm: (_email: string) => void }) {
  const { fields, handleChange } = useFormFields<{ password: string, email: string }>()
  const validateForm = useValidator()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors<typeof fields>>()
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const foundErrors = validateForm(fields)
    if (foundErrors) setErrors(foundErrors as Errors<typeof fields>)
    else {
      setErrors(undefined)
      setIsLoading(true)
    }
  }

  useEffect(() => {
    if (isLoading) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            setErrors({ password: undefined, email: 'El correo ya está registrado o es inexistente.' })
            throw new Error('El correo ya está registrado o es inexistente')
          } else showValidationForm(fields.email)
        })
        .catch((e) => {
          setErrors({ password: undefined, email: 'El correo ya está registrado o es inexistente.' })
          console.error(e)
        })
        .finally(() => {
          console.log('asdfjl')
          setIsLoading(false)
        })
    }
  }, [isLoading])

  return (
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
      <button disabled={isLoading} className={style.submit} type='submit'>{isLoading ? 'Cargando...' : 'Registrarse'}</button>
    </form>
  )
}
