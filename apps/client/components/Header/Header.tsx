'use client'
import Link from 'next/link'
import style from './style.module.scss'

export default function Header () {
  return (
    <header className={style.header}>
        <span>Logo</span>
        <nav className={style.header__navbar}>
          <ul className={style.header__menu}>
            <div className={style.header__navigation}>
              <li className='pointer'>
                <Link href={'#'}>Matches</Link>
              </li>
              <li className='pointer'>
                <Link href={'#'}>Mensajes</Link>
              </li>
              <li className="pointer">
                <details>
                  <summary>Informacion</summary>
                  <ul className={style.header__submenu}>
                    <li className='pointer'>
                      <Link href={'#'}>Quienes somos</Link>
                    </li>
                    <li className='pointer'>
                      <Link href={'#'}>Avisos Legales</Link>
                    </li>
                    <li className='pointer'>
                      <Link href={'#'}>Contacto</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </div>
            <li className='pointer'>
            <details>
                <summary>Perfil</summary>
                <ul className={style.header__submenu}>
                  <li className='pointer'>
                    <Link href={'#'}>Editar perfil</Link>
                  </li>
                  <li className='pointer'>
                    <Link href={'#'}>Configuración</Link>
                  </li>
                  <li className='pointer'>
                    <Link href={'#'}>Verificar perfil</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>

        <button>Inicar sesion</button>
        <Link href={'#'}>Cerrar sesión</Link>
    </header>
  )
}
