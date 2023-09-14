'use client'

import UserMatchCard from 'components/UserMatchCard'
import style from './page.module.scss'
import { slideAnimation } from '../../libs/slideAnimation'
import { type User } from 'types'
import { useState, useRef, useEffect } from 'react'
import { useSession } from 'hooks/useSession'

export function ClientPage () {
  const [matches, setMatches] = useState<User[] | []>([])
  const match = useRef<HTMLDivElement>(null)
  const { session } = useSession()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recom/0/${session?.user?.id}`)
      .then(res => res.ok ? res.json() : new Error('Something went wrong'))
      .then(res => {
        setMatches(res.map((data: {user: User}) => ({ ...data.user })))
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (match.current) {
      slideAnimation(match)
    }
  }, [matches])

  if (matches.length > 0 && matches[0]) {
    return (
      <div className={style.match} ref={match}>
        <UserMatchCard user={matches[0]} setMatches={setMatches} matches={matches} />
      </div>
    )
  }

  return (
    <p className={style.error}>Lo siento, no se encontraron matches para tu perfil</p>
  )
}
