/* eslint-disable @next/next/no-img-element */
/* eslint-disable @nx/enforce-module-boundaries */
import style from './style.module.scss'
import { CategoryDto } from '../../../../libs/dto/src/lib/user/update-categorys-user.dto'

interface Props {
  pin: CategoryDto['pins'][0]
}

// function getColorCategory (categoryName: string) {
//   switch (categoryName) {
//     case 'Anime':
//       return '#FF0000'
//     case 'Games':
//       return '#FFFF00'
//     case 'Musica':
//       return '#008000'
//     case 'Series':
//       return '#0000FF'
//     case 'Peliculas':
//       return '#4B0082'

//     default:
//       return '#000000'
//   }
// }

export function Pin ({ pin }: Props) {
  return (
    <figure className={`${style.pin} ${pin.categoryName}`}>
      <img className={style.pin__image} src={pin.imgUrl} alt={pin.name} />
      <span className={style.pin__name}>{pin.categoryName}</span>
    </figure>
  )
}
