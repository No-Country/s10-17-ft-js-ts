/* eslint-disable @next/next/no-img-element */
'use client'
import { Icons } from 'components/Icons'
import style from './style.module.scss'
import React from 'react'
import { useUserStore } from 'store/user'
import { handleAboutForm } from '../../../libs/validateEditForm'
import { AboutForm } from 'types'

interface ImageState {
  url: string | null
  file: File | null
}

export default function Index () {
  const { userState } = useUserStore()

  const [preview, setPreview] = React.useState(false)

  const [image, setImage] = React.useState<ImageState | undefined>({
    url: null,
    file: null
  })

  const [form, setForm] = React.useState<AboutForm>({
    data: {
      firstname: userState?.info.firstName,
      lastname: userState?.info.lastName,
      description: userState?.info.description,
      image: image?.url || userState?.info.images[0]
    },
    errors: {
      firstname: '',
      lastname: '',
      description: ''
    }
  })

  function handleImage (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e?.target?.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const url = URL.createObjectURL(file)
      reader.onloadend = () => {
        setImage({
          url,
          file
        })
      }
    }
  }

  function handlePreview () {
    setPreview(!preview)
  }

  return (
    <main className={style.aboutme}>
      <section className={style.aboutme__form}>
        <div className={style.aboutme__photo}>
          <figure className={style.aboutme__image}>
            <span className={style['aboutme__image-edit']}>
              <Icons.Edit width={35} height={35} />
            </span>
            <input
              type="file"
              itemType='image/*'
              onChange={handleImage}
            />
            <img src={image?.url || 'https://picsum.photos/200/200'} alt="profile" onError={(e) => {
              e.currentTarget.src = '/images/user-default.png'
            }}/>
          </figure>
        </div>
        <form className={style.aboutme__info}>
            <div className={style.aboutme__names}>
              <label className={style.aboutme__firstname}>
                Nombre
                <input
                  type="text"
                  name="firstname"
                  onChange={(e) => handleAboutForm(e, form, setForm)}
                  value={form.data.firstname}
                />
                <span>{form.errors.firstname}</span>
              </label>
              <label className={style.aboutme__lastname}>
                Apellido
                <input
                  type="text"
                  name="lastname"
                  onChange={(e) => handleAboutForm(e, form, setForm)}
                  value={form.data.lastname}
                />
                <span>{form.errors.lastname}</span>
              </label>
            </div>
            <label className={style.aboutme__description}>
              Descripción
              <textarea
                cols={30}
                rows={3}
                name='description'
                onChange={(e) => handleAboutForm(e, form, setForm)}
                placeholder='Agrega una descripción'
                value={form.data.description}
              >
              </textarea>
              <span>{form.errors.description}</span>
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
              <Icons.Close width={40} height={40} />
            </button>
            <div className={style['aboutme__preview-content']}>
              <div className={style.aboutme__preview1}>
                <img src={image?.url || 'https://picsum.photos/200/200'} alt="" />
                <div className={style['aboutme__preview1-info']}>
                  <div className={style['aboutme__preview1-info-name']}>
                    <h2>{form.data.firstname} {form.data.lastname},</h2>
                    <h2>29 años</h2>
                  </div>
                  <h3>Ubicación</h3>
                </div>
              </div>
              <div className={style.aboutme__interests}>
                <h2 className={style['aboutme__interests-title']}>Mis intereses</h2>
                <ul className={style['aboutme__interests-content']}>
                  {
                    ['Interes 1', 'Interes 2', 'Interes 3'].map((interest, index) => (
                        <li key={index} className={style.aboutme__interest}>
                          {interest}
                        </li>
                    ))
                  }
                </ul>
              </div>
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
              <div className={style.aboutme__preview2}>
                <h3>Sobre mí</h3>
                <p>
                  {form.data.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <button className={`${style.aboutme__save} btn`} disabled>
        Guardar Cambios
      </button>
    </main>
  )
}
