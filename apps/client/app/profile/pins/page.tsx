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
            className={style['pins__edit-button']}
            onClick={() => setEditPin(!editPin)}>
            <p>Editar</p>
            <span>🖋️</span>
          </button>
          <span className={style.pins__counter}>{`${8}/${50}`}</span>
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
              <button>🔍</button>
            </div>
          </div>
          <div className={style['pins__add-categories']}>
            <button
              className={style['pins__add-category']}
              value="movies">Películas</button>
            <button
              className={style['pins__add-category']}
              value="music">Música</button>
            <button
              className={style['pins__add-category']}
              value="games">Juegos</button>
            <button
              className={style['pins__add-category']}
              value="anime">Anime</button>
            <button
              className={style['pins__add-category']}
              value="tvseries">Series</button>
            <button
              className={style['pins__add-category']}
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
      </section>
    </main>
  )
}
