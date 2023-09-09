'use client'
/* eslint-disable @next/next/no-img-element */
import { Icons } from 'components/Icons'
import style from './style.module.scss'
import handleScroll from '../../../libs/handleScroll'
import React from 'react'

export default function Index () {
  const [isScroll, setIsScroll] = React.useState(false)
  const [isScroll2, setIsScroll2] = React.useState(false)
  const pins = React.useRef<HTMLUListElement>(null)
  const pinsResults = React.useRef<HTMLUListElement>(null)
  const [editPin, setEditPin] = React.useState(false)
  const [categorySelect, setCategorySelect] = React.useState<string | null>(null)

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
            <b>{8}</b>/
            <h4>{50}</h4>
          </h3>
        </header>

        <div className={style['pins__edit-pins']}>
          <ul className={style.pins__content} ref={pins}>
            {
              Array(25).fill(0).map((_, i) => (
                <figure key={i} className={style.pins__pin}>
                  <img src="https://picsum.photos/200/300" alt="" />
                  {editPin && (
                    <button>✏️</button>
                  )}
                </figure>
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
              <input type="text" placeholder='Buscar'/>
              <Icons.Search width={40} height={40} />
            </div>
          </div>
          <div className={style['pins__add-categories']}>
            <button
              onClick={() => setCategorySelect('movies')}
              className={`${categorySelect === 'movies' && style['pins__add-category']} btn-second`}
              value="movies">Películas</button>
            <button
              onClick={() => setCategorySelect('music')}
              className={`${categorySelect === 'music' && style['pins__add-category']} btn-second`}
              value="music">Música</button>
            <button
              onClick={() => setCategorySelect('games')}
              className={`${categorySelect === 'games' && style['pins__add-category']} btn-second`}
              value="games">Juegos</button>
            <button
              onClick={() => setCategorySelect('anime')}
              className={`${categorySelect === 'anime' && style['pins__add-category']} btn-second`}
              value="anime">Anime</button>
            <button
              onClick={() => setCategorySelect('tvseries')}
              className={`${categorySelect === 'tvseries' && style['pins__add-category']} btn-second`}
              value="tvseries">Series</button>
            <button
              onClick={() => setCategorySelect('others')}
              className={`${categorySelect === 'others' && style['pins__add-category']} btn-second`}
              value="others">Otros</button>
          </div>
        </header>
        <div className={style['pins__add-pins']}>
          <div className={style['pins__edit-pins']}>
          <ul className={style.pins__content} ref={pinsResults}>
            {
              Array(25).fill(0).map((_, i) => (
                <figure key={i} className={style.pins__pin}>
                  <img src="https://picsum.photos/200/300" alt="" />
                  <button>➕</button>
                </figure>
              ))
            }
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
