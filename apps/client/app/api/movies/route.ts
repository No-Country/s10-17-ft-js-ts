import axios from 'axios'
import { Movies } from 'types'
import { getMovieGenres } from './getMovieGenres'

export async function GET (request: Request) {
  const url = new URL(request.url)
  const name = url.searchParams.get('name')

  interface ResponseMovie {
    results: Movies
  }

  const API_KEY = '931791f0bdfde1176fa4b57eb3839c3d'

  const optionsMovie = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`
  }
  const responseMovie = await axios.request<ResponseMovie>(optionsMovie)

  const baseUrlImage = 'https://image.tmdb.org/t/p/'
  const imageSize = 'w500'

  try {
    const data = responseMovie.data.results.map((item) => {
      const imageUrl = `${baseUrlImage}${imageSize}${item.poster_path}`
      return {
        id: item.id,
        image: imageUrl,
        title: item.title,
        genres: item.genre_ids.map((genre) => {
          return getMovieGenres(genre)
        })
      }
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
