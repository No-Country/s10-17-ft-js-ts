/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Icons } from 'components/Icons'
import style from './style.module.scss'
import handleScroll from '../../../libs/handleScroll'
import React from 'react'
import { useUserStore } from 'store/user'
import { SearchPins } from 'components/SetupSteps/SearchPins'
import { Category } from 'types'
import { CategoryEnum } from '../../../../../libs/dto/src/lib/enums/category.enum'
import { CategoryDto } from '../../../../../libs/dto/src/lib/user/update-categorys-user.dto'
import { Pin } from 'components/Pin'

export default function Index () {
  const { userState } = useUserStore()
  const [isScroll, setIsScroll] = React.useState(false)
  const [isScroll2, setIsScroll2] = React.useState(false)
  const pins = React.useRef<HTMLUListElement>(null)
  const pinsResults = React.useRef<HTMLUListElement>(null)
  const [editPin, setEditPin] = React.useState(false)
  const [categorySelect, setCategorySelect] = React.useState<string>(userState?.user?.categorys[0].name as string)
  const [pinsBox, setPinsBox] = React.useState<Category['pins']>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (pins.current) {
      const { scrollWidth, clientWidth } = pins.current

      if (scrollWidth > clientWidth) {
        setIsScroll(true)
      }
    }

    if (pinsResults.current) {
      const x = pinsResults.current

      if (x?.scrollWidth > x?.clientWidth) {
        setIsScroll2(true)
      }
    }
  }, [])

  return (
    <main className={style.pins}>
      <section className={style.pins__edit}>
        <header className={style['pins__edit-header']}>
          <h2 className={style['pins__edit-title']}>Todos los pines</h2>
          <button
            className={`${style['pins__edit-button']} btn-second`}
            onClick={() => setEditPin(!editPin)}
          >
            <p>Editar</p>
            <Icons.Edit width={20} height={20} />
          </button>
          <h3 className={style.pins__counter}>
            <b>
            {userState &&
                userState?.user?.categorys.map((item) => (
                  item.pins.length
                )).reduce((a, b) => a + b, 0)
            }/
            </b>
            <h4>{40}</h4>
          </h3>
        </header>

        <div className={style['pins__edit-pins']}>
          <ul className={style.pins__content} ref={pins}>
            {
              userState?.user?.categorys.map((item) => (
                item.pins.map((pin, i) => (
                    <figure key={i} className={style.pins__pin}>
                      <Pin key={i} pin={pin} />
                      {editPin && (
                        <button>✖</button>
                      )}
                    </figure>
                ))
              ))

            }
          </ul>
          {isScroll && (
            <div className={style.pins__buttons}>
              <button value='left' onClick={(event) => handleScroll(event, pins)}>
                <Icons.Arrow width={20} height={20} />
              </button>
              <button value='right' onClick={(event) => handleScroll(event, pins)}>
                <Icons.Arrow width={20} height={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={style.pins__add}>
        <header className={style['pins__add-header']}>
          <div className={style['pins__search-container']}>
            <h2 className={style['pins__add-title']}>Agregar pines</h2>
            <div className={style['pins__add-search']}>
              {/* <input type="text" placeholder='Buscar'/> */}
              <SearchPins setIsLoading={setIsLoading} setPins={setPinsBox} selected={categorySelect}/>
              <Icons.Search width={40} height={40} />
            </div>
          </div>
          <div className={style['pins__add-categories']}>
            {
              userState?.user?.categorys.map((item, i) => (
                <button
                  key={i}
                  className={`${(item.name === categorySelect || (item.name === CategoryEnum.Videogames && categorySelect === 'Juegos')) && style['pins__add-category']} btn-second`}
                  onClick={() => setCategorySelect(item.name === CategoryEnum.Videogames ? 'Juegos' : item.name)}
                  value={item.name}
                >
                  {item.name}
                </button>
              ))
            }
          </div>
        </header>
        <div className={style['pins__add-pins']}>
          <div className={style['pins__edit-pins']}>
          <ul className={style.pins__content} ref={pinsResults}>
              {
                pinsBox.map((pin: CategoryDto['pins'][0], i: number) => (
                  <figure key={i} className={style.pins__pin}>
                    <Pin key={i} pin={pin} />
                    <button>➕</button>
                  </figure>
                ))}
              {isLoading && (
                <p>Cargando...</p>
              )}
          </ul>
          {isScroll2 && (
            <div className={style.pins__buttons}>
              <button value='left' onClick={(event) => handleScroll(event, pinsResults)}>
                <Icons.Arrow width={20} height={20} />
              </button>
              <button value='right' onClick={(event) => handleScroll(event, pinsResults)}>
                <Icons.Arrow width={20} height={20} />
              </button>
            </div>
          )}
          </div>
        </div>
        <button
          className={`btn ${style.pins__save}`} disabled
        >Guardar Cambios
        </button>
      </section>
    </main>
  )
}
