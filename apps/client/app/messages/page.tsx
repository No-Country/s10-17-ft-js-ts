'use client'
import { Mails } from 'components/Mails'
import style from './page.module.scss'
import { Chat } from 'components/Chat'
import { useRef } from 'react'
import { SliderPins } from 'components/SliderPins'

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
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
  'https://i.blogs.es/ebfd34/naruto-nuevos-episodios-estreno-septiembre-2023/840_560.jpeg',
  'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg'
]

export default function Index () {
  const chat = useRef<HTMLDivElement>(null)

  function handleOpenChat () {
    if (window.innerWidth < 1000) {
      if (!chat.current) return
      if (chat.current.style.display === 'flex') {
        chat.current.style.display = 'none'
        return
      }
      chat.current.style.display = 'flex'
    }
  }
  return (
    <main className={style.messages}>
      <Mails setOpenChat={handleOpenChat}/>
      <Chat chat={chat} setOpenChat={handleOpenChat}/>
      <section className={style.messages__pins}>
        <h2>Sus Pines en común</h2>
        <div className={style['messages__pins-container']}>
          <h3 className={style['messages__pins-title']}>Peliculas</h3>
          <SliderPins pins={pins} />
        </div>
        <div className={style['messages__pins-container']}>
          <h3 className={style['messages__pins-title']}>Música</h3>
          <SliderPins pins={pins} />
        </div>
        <div className={style['messages__pins-container']}>
          <h3 className={style['messages__pins-title']}>Juegos</h3>
          <SliderPins pins={pins} />
        </div>
        <div className={style['messages__pins-container']}>
          <h3 className={style['messages__pins-title']}>Series</h3>
          <SliderPins pins={pins} />
        </div>
      </section>
    </main>
  )
}
