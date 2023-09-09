/* eslint-disable @next/next/no-img-element */
import style from './style.module.scss'

const matches = [
  {
    photo: 'https://picsum.photos/200',
    name: 'John Doe',
    age: '25',
    ubication: 'Mexico',
    pins: '8'
  },
  {
    photo: 'https://picsum.photos/200',
    name: 'John Doe',
    age: '25',
    ubication: 'Mexico',
    pins: '8'
  },
  {
    photo: 'https://picsum.photos/200',
    name: 'John Doe',
    age: '25',
    ubication: 'Mexico',
    pins: '8'
  },
  {
    photo: 'https://picsum.photos/200',
    name: 'John Doe',
    age: '25',
    ubication: 'Mexico',
    pins: '8'
  },
  {
    photo: 'https://picsum.photos/200',
    name: 'John Doe',
    age: '25',
    ubication: 'Mexico',
    pins: '8'
  },
  {
    photo: 'https://picsum.photos/200',
    name: 'John Doe',
    age: '25',
    ubication: 'Mexico',
    pins: '8'
  }
]

export default function Index () {
  return (
    <main className={style.matches}>
      <h1>Matches</h1>
      <div className={style.matches__container}>
        {
          matches.map((match, index) => (
            <div key={index} className={style.matches__content}>
              <div className={style.matches__item}>
                <img src={match.photo} alt={match.name} className={style.matches__image} />
                <div className={style.matches__match}>
                  <div className={style.matches__info}>
                    <p className={style.matches__name}>{match.name}</p>
                    <span>{match.age} años</span>
                  </div>
                  <div className={style.matches__info2}>
                    <p>{match.ubication}</p>
                    <p>{match.pins} pines en cómun</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}
