import style from './style.module.scss'
import { useState } from 'react'

interface DataT {
  [key: string]: string
}

export function EmailValidation ({ email }: {email: string}) {
  const [data, setData] = useState<DataT | null>(null)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (data && Object.keys(data).length === 4) {
      const _code = Object.values(data).join('')
      const _email = email
    }
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
      <button className={style.submit} type='submit'>Verificación</button>
    </form>
  )
}
