/* eslint-disable no-unused-vars */
/* eslint-disable @nx/enforce-module-boundaries */
import { type UserDto } from '../../../libs/dto/src/lib/user/user.dto'
import { create } from 'zustand'

const pins = [
  'https://www.mundodeportivo.com/alfabeta/hero/2020/09/one-punch-man-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp',
  'https://www.mundodeportivo.com/alfabeta/hero/2020/09/one-punch-man-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://www.mundodeportivo.com/alfabeta/hero/2020/09/one-punch-man-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://www.mundodeportivo.com/alfabeta/hero/2020/09/one-punch-man-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg'
]

const interests = [
  'Interes 1',
  'Interes 2',
  'Interes 3',
  'Interes 4'
]

const user: UserDto = {
  firstName: 'Juan',
  lastName: 'Serrano',
  email: 'hola@mundo.com',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem.',
  images: [
    'https://avatars.githubusercontent.com/u/1182328?v=5',
    'https://avatars.githubusercontent.com/u/1182328?v=5',
    'https://avatars.githubusercontent.com/u/1182328?v=5',
    'https://avatars.githubusercontent.com/u/1182328?v=5'
  ],
  birthdate: new Date(),
  likedBy: [],
  gender: 'male',
  wantsGender: 'female',
  id: '1',
  isVerified: false
}

// Define la estructura de UserDto
interface User {
  info: UserDto;
  pins: string[];
  interests: string[];
};

interface UserStore {
  userState: User | null;
  setUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  userState: {
    info: user || null,
    pins: pins || null,
    interests: interests || null
  } || null,
  setUser: async (id: string) => {
    try {
      const pinsResponse = await fetch(`/api/user/pins/${id}`)
      const interestsResponse = await fetch(`/api/user/interests/${id}`)
      const userResponse = await fetch(`/api/user/${id}`)

      if (!pinsResponse.ok || !interestsResponse.ok || !userResponse.ok) {
        throw new Error('Error en la solicitud')
      }

      const pinsData: string[] = await pinsResponse.json()
      const interestsData: string[] = await interestsResponse.json()
      const userR: UserDto = await userResponse.json()

      const user: User = {
        info: userR,
        pins: pinsData,
        interests: interestsData
      }

      // Actualiza el estado con los datos recibidos
      set((prevState) => ({
        userState: user
      }))
    } catch (error) {
      // Manejo de errores aquí
      console.error('Error al obtener datos del usuario:', error)
    }
  }

}))
