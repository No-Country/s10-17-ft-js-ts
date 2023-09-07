/* eslint-disable @next/next/no-img-element */
'use client'
import { Icons } from 'components/Icons'
import style from './style.module.scss'
import React, { useEffect } from 'react'

export default function Index () {
  const [image, setImage] = React.useState<string | undefined>(undefined)
  const [preview, setPreview] = React.useState(false)
  //
  function handleImage (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e?.target?.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const url = URL.createObjectURL(file)
      reader.onloadend = () => {
        setImage(url)
      }
    }
  }

  useEffect(() => {
    // traer datos del usuario
  }, [])

  function handlePreview () {
    setPreview(!preview)
  }

  return (
    <main className={style.aboutme}>
      <section className={style.aboutme__form}>
        <div className={style.aboutme__photo}>
          <figure className={style.aboutme__image}>
            <span className={style['aboutme__image-edit']}>
              🖋️
            </span>
            <input type="file" onChange={handleImage}/>
            <img src={image || 'https://picsum.photos/200/200'} alt="profile" onError={(e) => {
              e.currentTarget.src = '/images/user-default.png'
            }}/>
          </figure>
        </div>
        <form className={style.aboutme__info}>
            <label className={style.aboutme__firstname}>
              Nombre
              <input type="text" name="firstname" />
              <span></span>
            </label>
            <label className={style.aboutme__lastname}>
              Apellido
              <input type="text" name="lastname" />
              <span></span>
            </label>
            <label className={style.aboutme__description}>
              Descripción
              <textarea cols={30} rows={3} placeholder='Agrega una descripción'></textarea>
              <span></span>
            </label>
            <span className={style.aboutme__location}>
              <Icons.Location width={30} height={30} />
              Tu ubicación
            </span>
        </form>
      </section>

      <section className={style.aboutme__preview}>
        <span className={style['aboutme__preview-title']} onClick={handlePreview}>
          <Icons.ViewPassword width={30} height={30} />
          Vista previa
        </span>

        {preview && (
          <div className={style['aboutme__preview-container']}>
            <button className={style['aboutme__preview-close']} onClick={handlePreview}>
              <Icons.Close width={30} height={30} />
            </button>
            <div className={style['aboutme__preview-content']}>
              <div className={style.aboutme__preview1}>
                <img src={image || 'https://picsum.photos/200/200'} alt="" />
                <div className={style['aboutme__preview1-info']}>
                  <h2>
                    <span>Santiago, </span>
                    <span>29 años</span>
                  </h2>
                  <h3>Ubicación</h3>
                </div>
              </div>
              <p className={style.aboutme__preview2}>
                Descripción: Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam asperiores libero cumque illo magni sequi.
              </p>
              <div className={style.aboutme__preview3}>
                <h2>Mis pines</h2>
                <div className={style.aboutme__pins}>
                  {['#', '#', '#'].map((item, index) => (
                    <figure key={index} className={style.aboutme__pin}>
                      <img src='https://picsum.photos/200/200' alt="" />
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
