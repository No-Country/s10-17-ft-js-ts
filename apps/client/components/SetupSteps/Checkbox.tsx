import { useEffect, useRef } from 'react'
import style from './style.module.scss'

interface Props {
  name: string
  addChecked: (_name: string) => void
  currentChecked: string | undefined
  multiple?: boolean
}

export function Checkbox ({ name, addChecked, currentChecked, multiple }: Props) {
  const checkbox = useRef<HTMLInputElement|null>(null)

  useEffect(() => {
    if (currentChecked !== name && checkbox.current?.checked && !multiple) {
      checkbox.current.checked = false
    }
  }, [currentChecked, checkbox.current])

  const handleClick = (e: React.SyntheticEvent) => {
    const { target } = e as unknown as { target: HTMLInputElement }

    if (multiple) addChecked(name)

    if (target.checked && !multiple) {
      addChecked(name)
    }
  }

  return (
      <div onClick={() => checkbox.current?.click()} className={style.form__checkbox}>
        <label>{name}</label>
        <input id={name} ref={checkbox} onClick={handleClick} type="checkbox" name={name} value={name}/>
      </div>
  )
}
