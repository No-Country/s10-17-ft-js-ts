import UserMatchCard from 'components/UserMatchCard'
import style from './page.module.scss'

const user = [
  {
    name: 'User name',
    photo: 'https://avatars.githubusercontent.com/u/1182328?v=5',
    location: 'User location',
    interests: ['Interest 1', 'Interest 2', 'Interest 3'],
    pins: [
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
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
      'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
      'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg'
    ],
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem.'
  },
  {
    name: 'User name',
    photo: 'https://avatars.githubusercontent.com/u/1122328?v=5',
    location: 'User location',
    interests: ['Interest 1', 'Interest 2', 'Interest 3', 'Interest 4'],
    pins: [
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
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg'
    ],
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem.'
  },
  {
    name: 'User name',
    photo: 'https://avatars.githubusercontent.com/u/1982328?v=5',
    location: 'User location',
    interests: ['Interest 1', 'Interest 2', 'Interest 3', 'Interest 4', 'Interest 5'],
    pins: [
      'https://www.mundodeportivo.com/alfabeta/hero/2020/09/one-punch-man-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp',
      'https://www.mundodeportivo.com/alfabeta/hero/2020/09/one-punch-man-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp',
      'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
      'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg'
    ],
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem.'
  }
]

export default async function Index () {
  return (
    <main className={style.home}>
      {
        user.map((user, index) => (
          <UserMatchCard key={index} user={user} />
        ))
      }
    </main>
  )
}
