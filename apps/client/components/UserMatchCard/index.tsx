/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import style from './style.module.scss'
import handleScroll from '../../libs/handleScroll'
import { Icons } from 'components/Icons'
import { Category, type User } from 'types'
import * as geolib from 'geolib'
import { useSession } from 'hooks/useSession'

interface Coordinates {
  latitude: number;
  longitude: number;
}
interface Props {
  user: User
  setMatches: React.Dispatch<React.SetStateAction<User[] | []>>
  matches: User[]
}

export default function UserMatchCard ({ user, setMatches, matches }: Props) {
  const pins = useRef<HTMLUListElement>(null)
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const { session } = useSession()
  const { latitude, longitude } = session?.user as Coordinates

  function calculateDistanceInKilometers (
    origin: Coordinates,
    destination: Coordinates
  ): number {
    const distanceInMeters = geolib.getPreciseDistance(origin, destination, 1)
    const distanceInKilometers = geolib.convertDistance(distanceInMeters, 'km')
    return distanceInKilometers
  }

  const allPins = useMemo(() => {
    const pins: Category['pins'] = []
    user.categorys.forEach((category) => {
      pins.push(...category.pins)
    })

    return pins
  }, [])

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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/like/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      }
    })
      .then(res => res.ok ? res.json() : new Error('Something went wrong'))
      .then(res => {
        console.log(res)
      })
      .catch(console.log)
      .finally(() => {
        nextMatch()
      })
  }

  function handleDislike () {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/dislike/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      }
    })
      .then(res => res.ok ? res.json() : new Error('Something went wrong'))
      .catch(console.log)
      .finally(() => {
        nextMatch()
      })
  }

  return (
    <div className={style.user}>
      <div className={style.user__content}>
        <div className={style.user__info}>
          <img className={style.user__photo} src={user?.avatar || 'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119151/Frame_427319171_n4yrps.png'} alt="User photo" />
          <div className={style.user__details}>
            <h2 className={style.user__name}>{user.firstName + ' ' + user.lastName}</h2>
            <p className={style.user__location}>{calculateDistanceInKilometers({ latitude, longitude }, { latitude: user.latitude as number, longitude: user.longitude as number }).toFixed(1)} kilómetros de distancia.</p>
          </div>
        </div>

        <div className={style.user__interests}>
          <h3 className={style['user__interests-title']}>Sus intereses</h3>
          <ul className={style['user__interests-content']}>
            {user.categorys.map((category, index) => (
              <li key={index} className={style.user__interest}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div className={style.user__pins}>
          <h3 className={style['user__pins-title']}>Sus pines</h3>
          <ul className={style['user__pins-content']} ref={pins}>
            {allPins.map((pin: Category['pins'], index: number) => (
              <li key={index + pin.name} className={style.user__pin} style={{ background: 'linear-gradient(45deg, rgb(186, 71, 71), rgb(33, 204, 164))' }}>
                <img className={style['user__pin-photo']} src={pin.imgUrl} alt="User pin" />
              </li>
            ))}
          </ul>
          {isScroll && (
            <div className={style['user__pins-buttons']}>
              <button value='left' onClick={(event) => handleScroll(event, pins)}>
                <Icons.Arrow width={20} height={20} />
              </button>
              <button value='right' onClick={(event) => handleScroll(event, pins)}>
                <Icons.Arrow width={20} height={20} />
              </button>
          </div>
          )}
        </div>

        <div className={style.user__about}>
          <h3 className={style['user__about-title']}>Sobre {user.firstName + ' ' + user.lastName}</h3>
          <p className={style['user__about-content']}>
            {user.description}
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
