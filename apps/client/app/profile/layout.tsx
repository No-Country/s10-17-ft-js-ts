import style from './style.module.scss'
import HeaderProfile from 'components/HeaderProfile'

export default function ProfileLayout ({ children }: { children: React.ReactNode }) {
  return (
    <main className={style.profile}>
      <HeaderProfile />
      {children}
    </main>
  )
}
