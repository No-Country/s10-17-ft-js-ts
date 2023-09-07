import style from './style.module.scss'

interface Props {
  placeholder: string
  options: string[] | number[]
  disabled: boolean
  handleChange: ({ target }: {target: HTMLInputElement | HTMLSelectElement}) => void // eslint-disable-line no-unused-vars
  name: string
}

export function Select ({ placeholder, options, handleChange, disabled, name }: Props) {
  return (
      <select name={name} className={style.select} disabled={disabled} onChange={handleChange} placeholder={placeholder}>
        <option value=''>{placeholder}</option>
        {
          options.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))
        }
      </select>
  )
}
