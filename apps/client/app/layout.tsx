import Header from 'components/Header'
import './global.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Bienvenido a Wave!',
  description: ':D'
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700']
})

export default function RootLayout ({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
