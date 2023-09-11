import { SetupStepProvider } from 'components/SetupStepProvider'
import style from './style.module.scss'
import { Header } from './header'

export default function Layout ({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SetupStepProvider>
        {children}
      </SetupStepProvider>
      <footer className={style.footer}>
        <p>Contacto</p>
        <p>Redes sociales</p>
        <p>Sobre Wave</p>
        <p>Avisos legales</p>
        <p>Términos y condiciones</p>
      </footer>
    </>
  )
}
