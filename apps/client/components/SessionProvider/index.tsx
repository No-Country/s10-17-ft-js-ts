'use client'

import { createContext, useEffect, useState } from 'react'
import { type ISession } from 'types'
import { AuthForm } from 'components/AuthForm'
import { usePathname, useRouter } from 'next/navigation'

interface IContext {
  session: ISession | null;
  setSession: (_session: ISession) => void;
  removeSession: () => void;
}

export const SessionCTX = createContext({} as IContext)

export function SessionProvider ({ children }: {children: React.ReactNode}) {
  const [session, setSession] = useState({} as ISession)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const getSessionStorage = async () => {
    const storedSession = localStorage.getItem('session')
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession)

      if (!parsedSession.user?.isProfileConfigured) router.push('/setup-account')
      // Here we should validate if the token is still valid
      // all data is saved in the session by now, so we can use it

      setSession(parsedSession)
    } else {
      setSession({} as ISession)
    }
  }

  const setSessionStorage = (newSession: ISession) => {
    localStorage.setItem('session', JSON.stringify(newSession)) // Should only store access_token
    setSession(newSession)
  }

  const removeSession = () => {
    localStorage.removeItem('session')
    setSession({} as ISession)
  }

  useEffect(() => {
    getSessionStorage()
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!isLoading && !session.user?.isProfileConfigured && session.user?.email && pathname !== '/') router.push('/setup-account')
  }, [isLoading, session, pathname])

  if (isLoading) return null // Loading spinner

  else if (!isLoading && !session.user?.isVerified && session.user?.email) {
    return (
    <SessionCTX.Provider value={{ setSession: setSessionStorage, session, removeSession }}>
      <AuthForm type='validate' email={session.user.email} />
    </SessionCTX.Provider>
    )
  } else if (!isLoading && !session.user?.isProfileConfigured && session.user?.email && pathname !== '/setup-account') return null

  return ( // If everything is ok
      <SessionCTX.Provider value={{ setSession: setSessionStorage, session, removeSession }}>
        {
          session.access_token || pathname === '/' ? children : <AuthForm type='login' />
        }
      </SessionCTX.Provider>
  )
}
