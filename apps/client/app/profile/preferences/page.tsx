'use client'
import React from 'react'
import style from './style.module.scss'
import { useUserStore } from 'store/user'
import { handleChageAge, handleChageDistance, handleSelectGenreOption, handleSelectSearchOption } from '../../../libs/validateEditForm'

export default function Index () {
  const { userState, setUser } = useUserStore()
  const distancePicker = React.useRef<HTMLHeadingElement>(null)
  const agePicker = React.useRef<HTMLHeadingElement>(null)

  function handleSaveChanges () {
    if (userState) {

      // peticion a la api
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
              ${userState?.user.lookingFor === 'all' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Solo conocer gente
              <input
                value={'all'}
                type="radio"
                checked={userState?.user.lookingFor === 'all'}
                onChange={(e) => {
                  if (userState) {
                    handleSelectSearchOption(e, userState, setUser)
                  }
                }}
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${userState?.user.lookingFor === 'friendship' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Amistad
              <input
                value={'friendship'}
                type="radio"
                checked={userState?.user.lookingFor === 'friendship'}
                onChange={(e) => {
                  if (userState) {
                    handleSelectSearchOption(e, userState, setUser)
                  }
                }}
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${userState?.user.lookingFor === 'love' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Relación
              <input
                value={'love'}
                type="radio"
                checked={userState?.user.lookingFor === 'love'}
                onChange={(e) => {
                  if (userState) {
                    handleSelectSearchOption(e, userState, setUser)
                  }
                }}
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${userState?.user.lookingFor === 'both' ? `${style['preferences__option--selected']}` : ''}
              `}
            >
              Lo que sea
              <input
                value={'both'}
                type="radio"
                checked={userState?.user.lookingFor === 'both'}
                onChange={(e) => {
                  if (userState) {
                    handleSelectSearchOption(e, userState, setUser)
                  }
                }}
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
              ${userState?.user.wantsGender === 'male' ? `${style['preferences__option--selected']}` : ''}`
              }>

              Hombres
              <input
                onChange={(e) => {
                  if (userState) {
                    handleSelectGenreOption(e, userState, setUser)
                  }
                }}
                value={'male'}
                checked={userState?.user.wantsGender === 'male'}
                type="radio"
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${userState?.user.wantsGender === 'female' ? `${style['preferences__option--selected']}` : ''}`
              }>

              Mujeres
              <input
                onChange={(e) => {
                  if (userState) {
                    handleSelectGenreOption(e, userState, setUser)
                  }
                }}
                value={'female'}
                checked={userState?.user.wantsGender === 'female'}
                type="radio"
              />
            </label>
            <label
              className={`
              ${style.preferences__option} 
              ${userState?.user.wantsGender === 'both' ? `${style['preferences__option--selected']}` : ''}`
              }>

              Todos
              <input
                onChange={(e) => {
                  if (userState) {
                    handleSelectGenreOption(e, userState, setUser)
                  }
                }}
                value={'both'}
                checked={userState?.user.wantsGender === 'both'}
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
              <h4 ref={distancePicker} className={style['preferences__picker-value']} style={{ left: `${userState?.user.zone && userState?.user.zone / 10 - 15}%` }}>
                {userState?.user.zone} KM
              </h4>
              <input
                min={10}
                max={1000}
                type="range"
                value={userState?.user.zone}
                onChange={(e) => {
                  if (userState) {
                    handleChageDistance(e, userState, setUser, distancePicker)
                  }
                }}
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
            <h4 ref={agePicker} className={style['preferences__picker-value']} style={{ left: `${userState?.user?.ageRange && userState?.user?.ageRange[1] - 10}%` } }>
              {userState?.user?.ageRange && userState?.user?.ageRange[1]}
            </h4>
            <input
              min={18}
              max={99}
              type="range"
              value={userState?.user?.ageRange && userState?.user?.ageRange[1]}
              onChange={(e) => {
                if (userState) {
                  handleChageAge(e, userState, setUser, agePicker)
                }
              }}
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
            userState?.user.categorys.map((item, i) => (
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
                    value={item.rate}
                    onChange={() => {
                      if (userState) {
                        // handleRateInterest(e, userState, setUser)
                      }
                    }}
                  />
                </label>
              </div>
            ))
          }
        </div>
      </section>
      <button
        disabled={false}
        className={`${style.preferences__save} btn`}
        onClick={handleSaveChanges}
      >
        Guardar cambios
      </button>
    </main>
  )
}
