/* eslint-disable @nx/enforce-module-boundaries */
import { CategoryEnum } from '../../../libs/dto/src/lib/enums/category.enum'
import { type UserDto } from '../../../libs/dto/src/lib/user/user.dto'

export const user: UserDto = {
  firstName: 'Juan',
  lastName: 'Serrano',
  email: 'hola@mundo.com',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem. Quisquam, voluptatem.',
  avatar: 'https://avatars.githubusercontent.com/u/1182328?v=5',
  images: [
    'https://avatars.githubusercontent.com/u/1182328?v=5',
    'https://avatars.githubusercontent.com/u/1182328?v=5',
    'https://avatars.githubusercontent.com/u/1182328?v=5',
    'https://avatars.githubusercontent.com/u/1182328?v=5'
  ],
  birthdate: new Date(),
  gender: 'male',
  wantsGender: 'female',
  id: '1',
  isVerified: false,
  isProfileConfigured: false,
  dislikedBy: [
    '7',
    '8',
    '9'
  ],
  likedBy: [
    '4',
    '5',
    '6'
  ],
  matches: [
    '1',
    '2',
    '3'
  ],
  categorys: [
    {
      name: CategoryEnum.Anime,
      rate: 2,
      pins: [
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'naruto',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        }
      ]
    },
    {
      name: CategoryEnum.Videogames,
      rate: 3,
      pins: [
        {
          name: 'call of duty',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'call of duty',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'call of duty',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        },
        {
          name: 'call of duty',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'shonen',
            'action'
          ]
        }
      ]
    },
    {
      name: CategoryEnum.Musica,
      rate: 2,
      pins: [
        {
          name: 'Feid',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'popular',
            'trap'
          ]
        },
        {
          name: 'Feid',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'popular',
            'trap'
          ]
        },
        {
          name: 'Feid',
          imgUrl: 'https://es.web.img3.acsta.net/pictures/210/154/21015404_20130626115836716.jpg',
          subCategories: [
            'popular',
            'trap'
          ]
        }
      ]
    },
    {
      name: CategoryEnum.TvSeries,
      rate: 1,
      pins: []
    },
    {
      name: CategoryEnum.Movies,
      rate: 1,
      pins: []
    }
  ],
  lookingFor: 'love',
  zone: 350,
  ageRange: [18, 99],
  latitude: 0,
  longitude: 0
}
