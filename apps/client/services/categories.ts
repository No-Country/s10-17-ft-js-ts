import { request } from './request'
import { type Category } from 'types'

const movies = {
  get: async (page = 1) => {
    const API_KEY = 'a0e1f02b394263b862d094dbc96d422c'
    const response = await request(`https://api.themoviedb.org/3/discover/movie?language=es&page=${page}&sort_by=popularity.desc&without_genres=tv&api_key=${API_KEY}`)

    const movieList = response.results.map((movie: unknown) => {
      const { genre_ids: genreIds, poster_path, title } = movie as { genre_ids: number[], poster_path: string, title: string }

      return {
        name: title,
        imgUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
        subCategories: genreIds,
        category: 'Películas'
      }
    })

    return movieList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  },
  search: async (query: string) => {
    const API_KEY = 'a0e1f02b394263b862d094dbc96d422c'
    const response = await request(`https://api.themoviedb.org/3/search/movie?language=es&query=${query}&sort_by=popularity.desc&api_key=${API_KEY}`)

    const movieList = response.results.map((movie: unknown) => {
      const { genre_ids: genreIds, title, poster_path } = movie as { genre_ids: number[], poster_path: string, title: string }

      return {
        name: title,
        imgUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
        subCategories: genreIds,
        category: 'Películas'
      }
    })

    return movieList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  }

}

const series = {
  get: async (page = 1) => {
    const API_KEY = 'a0e1f02b394263b862d094dbc96d422c'
    const response = await request(`https://api.themoviedb.org/3/discover/tv?language=en&page=${page}&sort_by=popularity.desc&api_key=${API_KEY}&limit=10`)

    const serieList = response.results.map((movie: unknown) => {
      const { genre_ids: genreIds, name, poster_path } = movie as { genre_ids: number[], name: string, poster_path: string }

      if (!poster_path || genreIds.length === 0) return null
      return {
        name,
        imgUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
        subCategories: genreIds,
        category: 'Series'
      }
    })

    return serieList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  },

  search: async (query: string) => {
    const API_KEY = 'a0e1f02b394263b862d094dbc96d422c'
    const response = await request(`https://api.themoviedb.org/3/search/tv?language=es&query=${query}&sort_by=popularity.desc&api_key=${API_KEY}&limit=10`)

    const serieList = response.results.map((movie: unknown) => {
      const { genre_ids: genreIds, name, poster_path } = movie as { genre_ids: number[], name: string, poster_path: string }

      return {
        name,
        imgUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
        subCategories: genreIds,
        category: 'Series'
      }
    })

    return serieList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  }
}

const animes = {
  get: async (page = 1) => {
    const response = await request(`https://api.jikan.moe/v4/anime?page=${page}&limit=10&sort=desc`)

    const animeList = response.data.map((anime: unknown) => {
      const { images, title, genres } = anime as { images: { jpg: { image_url: string } }, title: string, genres: { name: string }[] }
      const { image_url } = images.jpg
      const subCategories = genres.map((genre: {name: string}) => genre.name)

      return {
        name: title,
        imgUrl: image_url,
        subCategories,
        category: 'Anime'
      }
    })

    return animeList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  },

  search: async (query: string) => {
    const response = await request(`https://api.jikan.moe/v4/anime?q=${query}&limit=10&sort=desc`)

    const animeList = response.data.map((anime: unknown) => {
      const { images, title, genres } = anime as { images: { jpg: { image_url: string } }, title: string, genres: { name: string }[] }
      const { image_url } = images.jpg
      const subCategories = genres.map((genre: {name: string}) => genre.name)

      return {
        name: title,
        imgUrl: image_url,
        subCategories,
        category: 'Anime'
      }
    })

    return animeList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  }
}

const videogames = {
  get: async (page = 1) => {
    const API_KEY = '5a56a1e8a66e4d69859ab6849a755615'
    const response = await request(`https://api.rawg.io/api/games?page=${page}&key=${API_KEY}&limit=10`)

    const videogameList = response.results.map((videogame: unknown) => {
      const { name, background_image, genres } = videogame as { name: string, background_image: string, genres: { name: string }[] }
      const subCategories = genres.map((genre: {name: string}) => genre.name)

      return {
        name,
        imgUrl: background_image,
        subCategories,
        category: 'Videojuegos'
      }
    })

    return videogameList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  },

  search: async (query:string) => {
    const API_KEY = '5a56a1e8a66e4d69859ab6849a755615'
    const response = await request(`https://api.rawg.io/api/games?search=${query}&key=${API_KEY}&limit=10`)

    const videogameList = response.results.map((videogame: unknown) => {
      const { name, background_image, genres } = videogame as { name: string, background_image: string, genres: { name: string }[] }
      const subCategories = genres.map((genre: {name: string}) => genre.name)

      return {
        name,
        imgUrl: background_image,
        subCategories,
        category: 'Videojuegos'
      }
    })

    return videogameList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  }
}

const music = {
  get: async (page = 1) => {
    const API_KEY = 'f4def600c5f47c2895b148dd7c8d17e2'
    const response = await request(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&page=${page}&limit=10`)

    const musicList = response.artists.artist.map((artist: unknown) => {
      const { name, image } = artist as {name: string, image: [{'#text': string}]}
      const imgUrl = image[0]['#text'] // Dios... xD
      const subCategories = [name]

      return {
        name,
        imgUrl,
        subCategories,
        category: 'Música'
      }
    })

    return musicList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  },

  search: async (query: string) => {
    const API_KEY = 'f4def600c5f47c2895b148dd7c8d17e2'
    const response = await request(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${API_KEY}&format=json&limit=10`)

    const musicList = response.results.artistmatches.artist.map((artist: unknown) => {
      const { name, image } = artist as {name: string, image: [{'#text': string}]}
      const imgUrl = image[0]['#text'] // Dios... xD
      const subCategories = [name]

      return {
        name,
        imgUrl,
        subCategories,
        category: 'Música'
      }
    })
    return musicList.filter((movie: Category['pins']) => movie.imgUrl && movie.subCategories.length > 0)
  }
}

export const API = {
  movies,
  series,
  animes,
  videogames,
  music
}
