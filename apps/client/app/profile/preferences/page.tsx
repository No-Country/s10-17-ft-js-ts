'use client'
import React from 'react'
import style from './style.module.scss'

export default function Index () {
  const [distanceValue, setDistanceValue] = React.useState(0)
  const [ageValue, setAgeValue] = React.useState(0)

  function handleDistanceChange (e: React.ChangeEvent<HTMLInputElement>) {
    setDistanceValue(Number(e.target.value))
  }

  return (
    <main className={style.preferences}>
      <section className={style.preferences__section}>
        <div className={style['preferences__search-container']}>
          <h2>¿Qué buscas?</h2>
          <div className={style.preferences__searches}>
            <label className={style.preferences__search}>
              Solo conocer gente
              <input value={'friendship'} type="radio" />
            </label>
            <label className={style.preferences__search}>
              Amistad
              <input value={'friendship'} type="radio" />
            </label>
            <label className={style.preferences__search}>
              Relación
              <input value={'love'} type="radio" />
            </label>
            <label className={style.preferences__search}>
              Lo que sea
              <input value={'both'} type="radio" />
            </label>
          </div>
        </div>

        <div className={style.preferences__genre}>
          <h2>¿Qué te mostramos?</h2>
          <div className={style.preferences__genres}>
            <label className={style.preferences__genre}>
              Hombres
              <input value={'male'} type="radio" />
            </label>
            <label className={style.preferences__genre}>
              Mujeres
              <input value={'female'} type="radio" />
            </label>
            <label className={style.preferences__genre}>
              Todos
              <input value={'all'} type="radio" />
            </label>
          </div>
        </div>

        <div className={style.preferences__range}>
          <h2>Rango de distancia</h2>
          <div className={style['preferences__range-labels']}>
            <p>Cerca</p>
            <p>Lejos</p>
          </div>
          <div>
            <span>{distanceValue}</span>
            <input type="range" value={distanceValue} defaultValue={distanceValue} onChange={handleDistanceChange}/>
          </div>
          <div className={style['preferences__range-labels']}>
            <p>- 10km</p>
            <p>+ 1000km</p>
          </div>
        </div>

        <div className={style.preferences__country}>
          <label className={style['preferences__country-opt']}>
            <input type="checkbox" name="" id="" />
            Mostrarme gente de mi país
          </label>

          <label className={style['preferences__country-opt']}>
            <input type="checkbox" name="" id="" />
            Mostrarme gente fuera de mi país
          </label>
        </div>

        <div className={style.preferences__range}>
          <h2>Rango de Edad</h2>
          <div className={style['preferences__range-labels']}>
            <p>Menos</p>
            <p>Más</p>
          </div>
          <div>
            <span>{ageValue}</span>
            <input type="range" value={ageValue} defaultValue={ageValue} onChange={e => setAgeValue(Number(e.target.value))}/>
          </div>
          <div className={style['preferences__range-labels']}>
            <p>18</p>
            <p>99</p>
          </div>
        </div>
      </section>

      <section className={style.preferences__interests}>
        <h2>Que tanto te interesa</h2>
        {
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={style.preferences__interest}>
              <div>
                <p>Qué tanto te gusta?</p>
                <div>
                  <span>✔️</span>
                  <p>Anime</p>
                </div>
              </div>
              <label className={style['preferences__interest-label']}>
                <input type="range"/>
              </label>
              <div className={style['preferences__range-labels']}>
                <p>Poco</p>
                <p>Soy fan!</p>
              </div>
            </div>
          ))
        }
      </section>
    </main>
  )
}
