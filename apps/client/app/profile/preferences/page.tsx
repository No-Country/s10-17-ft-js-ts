'use client'
import React from 'react'
import style from './style.module.scss'

export default function Index () {
  const [distanceValue, setDistanceValue] = React.useState(10)
  const [ageValue, setAgeValue] = React.useState(18)
  const [searchOption, setSearchOption] = React.useState('')
  const [genreOption, setGenreOption] = React.useState('')
  const distancePicker = React.useRef<HTMLHeadingElement>(null)
  const agePicker = React.useRef<HTMLHeadingElement>(null)

  function handleSelectSearchOption (e: React.ChangeEvent<HTMLInputElement>) {
    setSearchOption(e.target.value)
  }

  function handleSelectGenreOption (e: React.ChangeEvent<HTMLInputElement>) {
    setGenreOption(e.target.value)
  }

  function handleChageDistance (e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    setDistanceValue(value)

    if (distancePicker.current && value > 100) {
      distancePicker.current.style.left = `${e.currentTarget.clientWidth * (value / 1000) - 60}px`
    }
  }

  function handleChageAge (e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    setAgeValue(value)

    if (agePicker.current && value > 20) {
      agePicker.current.style.left = `${e.currentTarget.clientWidth * (value / 99) - 70}px`
    }
  }

  return (
    <main className={style.preferences}>
      <section className={style.preferences__searching}>
        <div className={style['preferences__searching-options']}>
          <div className={style['preferences__search-container']}>
          <h2>¿Qué buscas?</h2>
          <div className={style.preferences__searches}>
            <label
              className={`
              ${style.preferences__option} 
              ${searchOption === 'all' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Solo conocer gente
              <input
                value={'all'}
                type="radio"
                defaultChecked={true}
                onChange={handleSelectSearchOption}
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${searchOption === 'friendship' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Amistad
              <input
                value={'friendship'}
                type="radio"
                defaultChecked={false}
                onChange={handleSelectSearchOption}
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${searchOption === 'love' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Relación
              <input
                value={'love'}
                type="radio"
                defaultChecked={false}
                onChange={handleSelectSearchOption}
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${searchOption === 'both' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Lo que sea
              <input
                value={'both'}
                type="radio"
                defaultChecked={false}
                onChange={handleSelectSearchOption}
              />
            </label>
          </div>
          </div>

          <div className={style.preferences__genre}>
          <h2>¿Qué te mostramos?</h2>
          <div className={style.preferences__genres}>
            <label
              className={`
              ${style.preferences__option} 
              ${genreOption === 'male' ? `${style['preferences__option--selected']}` : ''}`
              }>

              Hombres
              <input
                onChange={handleSelectGenreOption}
                value={'male'}
                type="radio"
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${genreOption === 'female' ? `${style['preferences__option--selected']}` : ''}`
              }>

              Mujeres
              <input
                onChange={handleSelectGenreOption}
                value={'female'}
                type="radio"
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${genreOption === 'all' ? `${style['preferences__option--selected']}` : ''}`
              }>

              Todos
              <input
                onChange={handleSelectGenreOption}
                value={'all'}
                type="radio"
              />
            </label>
          </div>
          </div>
        </div>

        <div className={style.preferences__ranges}>
          <div className={style.preferences__range}>
            <h2>Rango de distancia</h2>
            <div className={style['preferences__range-labels']}>
              <p>Cerca</p>
              <p>Lejos</p>
            </div>
            <div className={style['preferences__range-input']}>
              <h4 ref={distancePicker} className={style['preferences__picker-value']}>
                {distanceValue} KM
              </h4>
              <input
                min={10}
                max={1000}
                type="range"
                value={distanceValue}
                defaultValue={distanceValue}
                onChange={handleChageDistance}
              />
            </div>
            <div className={style['preferences__range-labels']}>
              <span> - 10km</span>
              <span> + 1000km</span>
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
          <div className={style['preferences__range-input']}>
            <h4 ref={agePicker} className={style['preferences__picker-value']} >
              {ageValue}
            </h4>
            <input
              min={18}
              max={99}
              type="range"
              value={ageValue}
              defaultValue={ageValue}
              onChange={handleChageAge}
            />
          </div>
          <div className={style['preferences__range-labels']}>
            <p>18</p>
            <p>99</p>
          </div>
          </div>
        </div>
      </section>

      <section className={style.preferences__interests}>
        <h2>¿Cuáles son tus intereses y cuánto te gustan?</h2>
        <div className={style['preferences__interest-container']}>
          {
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={style.preferences__interest}>
                <div className={style['preferences__interest-info']}>
                    <span>✔️</span>
                    <p>Anime</p>
                </div>
                <label className={style['preferences__interest-label']}>
                  <input
                    min={1}
                    max={3}
                    type="range"
                    defaultValue={1}
                    value={'anime'}
                    // onChange={() => {}}
                  />
                </label>
              </div>
            ))
          }
        </div>
      </section>
      <button
        disabled={true}
        className={`${style.preferences__save} btn`}
      >
        Guardar cambios
      </button>
    </main>
  )
}
