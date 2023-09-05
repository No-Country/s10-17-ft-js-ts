import Header from 'components/Header'
import './global.css'
import '../styles/themes.scss'
import '../styles/main.scss'
import { Poppins } from 'next/font/google'

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
        <Header />
        {children}
      </body>
    </html>
  )
}
