'use client'
import style from './style.module.scss'
import { Icons } from 'components/Icons'
import { useRouter } from 'next/navigation'

export default function BackButton () {
  const router = useRouter()

  function handleBack () {
    router.back()
  }
  return (
      <div className={style.back} onClick={handleBack}>
        <Icons.Back width={30} height={30}/>
        <p>Volver</p>
      </div>
  )
}
