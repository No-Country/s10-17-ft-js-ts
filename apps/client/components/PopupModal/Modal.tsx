'use client'

import style from './style.module.scss'
import { createPortal } from 'react-dom'

function Component ({ children }: {children: React.ReactNode}) {
  return (
    <section className={style.wrapper}>
        {children}
    </section>
  )
}

export default function Modal ({ children }: {children: React.ReactNode}) {
  return createPortal(
    <Component>
      {children}
    </Component>
    , document.body)
}
