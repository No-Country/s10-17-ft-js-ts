import style from './style.module.scss'
import { useState, useEffect } from 'react'

export function SearchPins () {
  // const [pins, setPins] = useState()
  const [search, setSearch] = useState('')

  const handleChange = ({ target }: {target: HTMLInputElement}) => setSearch(target.value)

  useEffect(() => {
    if (search) {
      // fetch(`https://api.p.....
    }
  }, [search])

  return (
    <div className={style.form__searchPins}>
      <input type="text" value={search} onChange={handleChange} placeholder='Buscar pines' />
    </div>
  )
}
