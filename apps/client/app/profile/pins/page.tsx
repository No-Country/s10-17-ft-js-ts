/* eslint-disable @next/next/no-img-element */
import style from './style.module.scss'

export default async function Index () {
  return (
    <main className={style.pins}>
      <section className={style.pins__edit}>
        <header className={style['pins__edit-header']}>
          <h2 className={style['pins__edit-title']}>Todos los pines</h2>
          <button>Editar 🖋️</button>
          <span className={style.pins__counter}>{`${8}/${50}`}</span>
        </header>
        <div className={style['pins__edit-pins']}>
          {
            Array(25).fill(0).map((_, i) => (
              <figure key={i} className={style.pins__pin}>
                <img src="https://picsum.photos/200/300" alt="" />
                <button>🖋️</button>
              </figure>
            ))
          }
        </div>
      </section>
      <section className={style.pins__add}>
        <header className={style['pins__add-header']}>
          <div>
            <h2 className={style['pins__add-title']}>Agregar pines</h2>
            <div className={style['pins__add-search']}>
              <input type="text" placeholder='Buscar'/>
              <button>🔍</button>
            </div>
          </div>
          <div className={style['pins__add-categories']}>
            <button value="movies">Películas</button>
            <button value="music">Música</button>
            <button value="games">Juegos</button>
            <button value="anime">Anime</button>
            <button value="tvseries">Series</button>
            <button value="others">Otros</button>
          </div>
        </header>
        <div className={style['pins__add-pins']}>
          {
            Array(25).fill(0).map((_, i) => (
              <figure key={i} className={style.pins__pin}>
                <img src="https://picsum.photos/200/300" alt="" />
                <button>➕</button>
              </figure>
            ))
          }
        </div>
      </section>
    </main>
  )
}
