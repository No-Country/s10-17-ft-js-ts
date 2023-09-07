import style from './style.module.scss'

interface Props {
  handleChange: ({ target }: {target: HTMLInputElement}) => void // eslint-disable-line no-unused-vars
  placeholder: string
  name: string
  label?:string
  type?:string
}

export function Input ({ handleChange, placeholder, label, type, name }: Props) {
  return (
    <div className={style.input}>
      {label ? <label className={style.input__label}>{label}</label> : ''}
      <input type={type || 'text'} className={style.input__field} name={name} onChange={handleChange} placeholder={placeholder} />
    </div>
  )
}
