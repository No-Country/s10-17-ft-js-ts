import style from './style.module.scss'

export default async function Index () {
  return (
    <main className={style.preferences}>
      <section className={style.preferences__section}>
        <div className={style.preferences__genre}>
          <h2>Que buscas</h2>
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
          <input type="range" />
          <div className={style['preferences__range-labels']}>
            <p>Menos de 10km</p>
            <p>Más de 1000km</p>
          </div>
        </div>

        <div className={style.preferences__range}>
          <h2>Rango de Edad</h2>
          <div className={style['preferences__range-labels']}>
            <p>Menos</p>
            <p>Más</p>
          </div>
          <input type="range" />
          <div className={style['preferences__range-labels']}>
            <p>18</p>
            <p>99</p>
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
