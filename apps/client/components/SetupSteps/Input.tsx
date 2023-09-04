import style from './style.module.scss'

interface Props {
  handleChange: ({ target }: {target: HTMLInputElement}) => void // eslint-disable-line no-unused-vars
  placeholder: string
  label?:string
}

export function Input ({ handleChange, placeholder, label }: Props) {
  return (
    <div className={style.input}>
      {label ? <label className={style.input__label}>{label}</label> : ''}
      <input className={style.input__field} onChange={handleChange} placeholder={placeholder} />
    </div>
  )
}
