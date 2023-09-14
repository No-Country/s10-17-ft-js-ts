/* eslint-disable no-unused-vars */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios'
import { type UserDto } from '../../../libs/dto/src/lib/user/user.dto'
import { create } from 'zustand'

// Define la estructura de UserDto
export interface User {
  user: UserDto | null;
};

interface UserData {
  data: UserDto;
}

interface UserStore {
  userState: User | null;
  getUser: (id: string) => Promise<void>;
  setUser: (user: UserDto) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userState: {
    user: null
  } || null,
  getUser: async (id: string) => {
    try {
      // Obtener los datos del usuario
      const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`)

      // Actualiza el estado con los datos recibidos
      set(() => ({
        userState: {
          user: user.data
        }
      }))
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error)
    }
  },
  setUser (user: UserDto) {
    set(() => ({
      userState: {
        user
      }
    }))
  }

}))
