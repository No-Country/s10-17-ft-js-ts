import Header from 'components/Header'
import './global.css'
import '../styles/scroll.scss'
import '../styles/themes.scss'
import '../styles/main.scss'
import { Poppins } from 'next/font/google'
import { SessionProvider } from 'components/SessionProvider'

export const metadata = {
  title: 'Bienvenido a Wave!',
  description: ':D'
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export default function RootLayout ({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={poppins.className}>
        <SessionProvider>
          <Header />
          {children}
          <footer className='footer'>
            <p>Contacto</p>
            <p>Redes sociales</p>
            <p>Sobre Wave</p>
            <p>Avisos legales</p>
            <p>Términos y condiciones</p>
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
