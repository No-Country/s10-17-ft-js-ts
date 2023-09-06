'use client'

import style from './style.module.scss'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Component ({ children }: {children: React.ReactNode}) {
  return (
    <section className={style.wrapper}>
        {children}
    </section>
  )
}

export default function Modal ({ children }: {children: React.ReactNode}) {
  const element = document.body

  useEffect(() => {
    element.style.overflow = 'hidden'
    return () => {
      element.style.overflow = 'auto'
    }
  }, [element])

  return createPortal(
    <Component>
      {children}
    </Component>
    , element)
}
