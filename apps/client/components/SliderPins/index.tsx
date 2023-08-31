/* eslint-disable @next/next/no-img-element */
import style from './style.module.scss'

interface Props {
  pins: string[]
}

export function SliderPins ({ pins }: Props) {
  return (
    <div className={style['slider-pins']}>
      <div className={style['slider-pins__container']}>
        {pins.map((pin, index) => (
            <img key={index} className={style['slider-pins__pin']} src={pin} alt="pin"/>
        ))}
      </div>

      <div className={style.slider__controls}>
        <button className={style['slider__control-button']}>
          <span className={style['slider__control-icon']}>⬅️</span>
        </button>
        <button className={style['slider__control-button']}>
          <span className={style['slider__control-icon']}>➡️</span>
        </button>
      </div>
    </div>
  )
}
