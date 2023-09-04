import style from './style.module.scss'
import { useState } from 'react'

interface Props {
  placeholder: string
  options: string[]
}

export function Select ({ placeholder, options: _optionsNotUsed }: Props) {
  // const [isOpen, setIsOpen] = useState(false)
  const [selected, _setSelected] = useState()

  return (
    <div className={style.select}>
      <span className={style.select__field}>{selected || placeholder}</span>
    </div>
  )
}
