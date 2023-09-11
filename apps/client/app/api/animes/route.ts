import axios from 'axios'
import { Animes } from 'types'

export async function GET (request: Request) {
  const url = new URL(request.url)
  const name = url.searchParams.get('name')

  const options = {
    method: 'GET',
    url: `https://api.jikan.moe/v4/anime?q=${name}/20`,
    headers: {
      'X-RapidAPI-Key': 'cdc2e78bb2msh5c0f82f780776d9p1a4c13jsnbefa8549aced',
      'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
  }

  interface Response {
    data: Animes
  }

  try {
    const response = await axios.request<Response>(options)
    const data = response.data.data.map((item) => {
      return {
        id: item.mal_id,
        image: item.images.jpg.image_url || item.images.webp.image_url,
        title: item.title,
        genres: item.genres.map((genre) => genre.name)
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
