/* eslint-disable @next/next/no-img-element */
'use client'
import { Icons } from 'components/Icons'
import style from './style.module.scss'
import { useEffect } from 'react'

export default async function Index () {
  useEffect(() => {
    // traer datos del usuario
  }, [])

  return (
    <main className={style.aboutme}>
      <section className={style.aboutme__form}>
        <div className={style.aboutme__image}>
          <figure>
            <h1>
              🖋️
            </h1>
            <img src="/images/user-default.png" alt="profile" />
          </figure>
        </div>
        <form className={style.aboutme__info}>
          <div>
            <label className={style.aboutme__name}>
              Nombre
              <input type="text" name="name" id="name" />
              <span></span>
            </label>
            <span>
              <Icons.Location width={30} height={30} />
              Tu ubicación
            </span>
          </div>
          <label className={style.aboutme__description}>
            Descripción
            <textarea cols={30} rows={3} placeholder='Agrega una descripción'></textarea>
            <span></span>
          </label>
        </form>
      </section>
      <section className={style.aboutme__preview}>
        <span className={style['aboutme__preview-title']}>
          <Icons.HiddenPassword width={30} height={30} />
          Vista previa
        </span>

        <div className={style['aboutme__preview-content']}>
          <div className={style.aboutme__preview1}>
            <img src="/" alt="mi foto de usuario" />
            <div>
              <h2>
                <span>Nombre</span>
                <span>Edad</span>
              </h2>
              <h3>Ubicación</h3>
            </div>
          </div>
          <p className={style.aboutme__preview2}>
            Descripción: Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam asperiores libero cumque illo magni sequi.
          </p>
          <div className={style.aboutme__preview3}>
            {['#', '#', '#'].map((item, index) => (
              <figure key={index} className={style.aboutme__pins}>
                <img src={`${item}`} alt="" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
