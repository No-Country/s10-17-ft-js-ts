/* eslint-disable @next/next/no-img-element */
/* eslint-disable @nx/enforce-module-boundaries */
import style from './style.module.scss'
import { CategoryDto } from '../../../../libs/dto/src/lib/user/update-categorys-user.dto'

interface Props {
  pin: CategoryDto['pins'][0]
}

export function Pin ({ pin }: Props) {
  return (
    <figure className={`${style.pin}`}>
      <img className={style.pin__image} src={pin.imgUrl} alt="Pin"/>
    </figure>
  )
}
