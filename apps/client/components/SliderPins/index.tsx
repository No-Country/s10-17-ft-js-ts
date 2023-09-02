/* eslint-disable @next/next/no-img-element */
import handleScroll from '../../libs/handleScroll'
import style from './style.module.scss'
import { useEffect, useRef, useState } from 'react'

interface Props {
  pins: string[]
}

export function SliderPins ({ pins }: Props) {
  const pinsRef = useRef<HTMLDivElement>(null)
  const [isScroll, setIsScroll] = useState<boolean>(false)

  useEffect(() => {
    if (pinsRef.current?.scrollWidth) {
      setIsScroll(pinsRef.current?.scrollWidth > pinsRef.current?.clientWidth)
    }
  }, [isScroll])

  return (
    <div className={style.pins__container}>
      <div className={style.pins} ref={pinsRef}>
        <ul className={style.pins__content}>
          {pins.map((pin, index) => (
            <li key={index} className={style.pins__item} style={{ background: 'linear-gradient(45deg, rgb(186, 71, 71), rgb(33, 204, 164))' }}>
              <img className={style.pins__photo} src={pin} alt="User pin" />
            </li>
          ))}
        </ul>
      </div>

      {isScroll && (
        <div className={style.pins__buttons}>
          <button
            className={style.pins__button}
            value='left'
            onClick={(event) => handleScroll(event, pinsRef)}>
            ⬅️
          </button>
          <button
            className={style.pins__button}
            value='right'
            onClick={(event) => handleScroll(event, pinsRef)}>
            ➡️
          </button>
        </div>
      )}
    </div>
  )
}
