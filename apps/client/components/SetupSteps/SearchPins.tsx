import style from './style.module.scss'
import { useState, useEffect } from 'react'
import { type Category } from 'types'
import { API } from 'services/categories'

interface Props {
  setPins: React.Dispatch<React.SetStateAction<Category['pins']>>
  selected: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function SearchPins ({ setPins, selected, setIsLoading }: Props) {
  const [search, setSearch] = useState('')

  const handleChange = ({ target }: {target: HTMLInputElement}) => setSearch(target.value)

  useEffect(() => {
    async function searchForPins () {
      if (search) {
        const fetchers: Promise<unknown>[] = []
        setIsLoading(true)

        selected.split(',').forEach((category) => {
          if (category === 'Anime') fetchers.push(API.animes.search(search))
          if (category === 'Juegos') fetchers.push(API.videogames.search(search))
          if (category === 'Peliculas') fetchers.push(API.movies.search(search))
          if (category === 'Musica') fetchers.push(API.music.search(search))
          if (category === 'Series') fetchers.push(API.series.search(search))
        })

        try {
          const results = (await Promise.all(fetchers)).flatMap((result) => result)
          setPins(results as Category['pins'])
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }
      }
    }

    const timeout = setTimeout(() => {
      searchForPins()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <div className={style.form__searchPins}>
      <input type="text" value={search} onChange={handleChange} placeholder='Buscar pines' />
    </div>
  )
}
