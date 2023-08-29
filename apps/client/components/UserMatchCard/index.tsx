/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import handleScroll from '../../libs/handleScroll'

// TODO: tipar user
interface User {
  name: string
  photo: string
  location: string
  interests: string[]
  pins: string[]
  about: string
}

interface Props {
  user: User
  setMatches: React.Dispatch<React.SetStateAction<User[] | []>>
  matches: User[]
}

export default function UserMatchCard ({ user, setMatches, matches }: Props) {
  const pins = useRef<HTMLUListElement>(null)
  const [isScroll, setIsScroll] = useState<boolean>(false)

  useEffect(() => {
    if (pins.current?.scrollWidth) {
      setIsScroll(pins.current?.scrollWidth > pins.current?.clientWidth)
    }
  }, [isScroll])

  function nextMatch () {
    const newMatches = [...matches]
    newMatches.shift()
    setMatches(newMatches)
  }

  function handleLike () {
    nextMatch()
    // logical
  }

  function handleDislike () {
    nextMatch()
    // logical
  }

  return (
    <div className={style.user}>
      <div className={style.user__content}>
        <div className={style.user__info}>
          <img className={style.user__photo} src={user.photo} alt="User photo" />
          <div className={style.user__details}>
            <h2 className={style.user__name}>{user.name}</h2>
            <p className={style.user__location}>{user.location}</p>
          </div>
        </div>

        <div className={style.user__interests}>
          <h3 className={style['user__interests-title']}>Sus intereses</h3>
          <ul className={style['user__interests-content']}>
            {user.interests.map((interest, index) => (
              <li key={index} className={style.user__interest}>
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <div className={style.user__pins}>
          <h3 className={style['user__pins-title']}>Sus pines</h3>
          <ul className={style['user__pins-content']} ref={pins}>
            {user.pins.map((pin, index) => (
              <li key={index} className={style.user__pin} style={{ background: 'linear-gradient(45deg, rgb(186, 71, 71), rgb(33, 204, 164))' }}>
                <img className={style['user__pin-photo']} src={pin} alt="User pin" />
              </li>
            ))}
          </ul>
          {isScroll && (
            <div className={style['user__pins-buttons']}>
              <button value='left' onClick={(event) => handleScroll(event, pins)}>⬅️</button>
              <button value='right' onClick={(event) => handleScroll(event, pins)}>➡️</button>
            </div>
          )}
        </div>

        <div className={style.user__about}>
          <h3 className={style['user__about-title']}>Sobre {user.name}</h3>
          <p className={style['user__about-content']}>
            {user.about}
          </p>
        </div>
      </div>

      <div className={style.user__buttons}>
        <button onClick={handleDislike} className={style.user__button}>✖️</button>
        <button onClick={handleLike} className={style.user__button}>✅</button>
      </div>
    </div>
  )
}
