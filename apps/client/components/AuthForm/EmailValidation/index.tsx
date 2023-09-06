import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'hooks/useSession'

interface DataT {
  [key: string]: string
}

export function EmailValidation ({ email }: {email: string}) {
  const [data, setData] = useState<DataT | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const { setSession } = useSession()

  useEffect(() => {
    if (isLoading) {
      if (data && Object.keys(data).length === 4) {
        const code = Object.values(data).join('')
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkVerificationCode?email=${email}&code=${code}`, { method: 'POST' })
          .then(res => {
            if (!res.ok) {
              setError(true)
              throw new Error('El código es incorrecto.')
            }
            return res.json()
          })
          .then((data) => {
            setSession(data)
            router.push('/home')
          })
          .catch((e) => {
            setError(true)
            console.log(e)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    }
  }, [isLoading])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (data && Object.keys(data).length === 4) setIsLoading(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length === 1) {
      setData((prev) => ({ ...prev, [e.target.name]: value }))
      const nextInput = e.target.nextElementSibling as HTMLInputElement
      if (nextInput) {
        nextInput.focus()
      }
    } else if (value.length > 1) {
      e.target.value = value.slice(0, 1)
    } else if (value.length === 0) {
      setData((prev) => {
        const { [e.target.name]: _, ...rest } = prev || {}
        return rest
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <span className={style.form__container}>
        <input type="text" name='1' className={style.form__token} onChange={handleChange} placeholder='_' />
        <input type="text" name='2' className={style.form__token} onChange={handleChange} placeholder='_' />
        <input type="text" name='3' className={style.form__token} onChange={handleChange} placeholder='_' />
        <input type="text" name='4' className={style.form__token} onChange={handleChange} placeholder='_' />
      </span>
      {error && <small className={style.form__error}>El código es incorrecto.</small>}
      <button disabled={isLoading} className={style.submit} type='submit'>{isLoading ? 'Cargando...' : 'Verificación'}</button>
    </form>
  )
}
