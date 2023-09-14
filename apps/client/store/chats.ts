/* eslint-disable no-unused-vars */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios'
import { create } from 'zustand'

// Define la estructura de UserDto
interface Chats {
  chats: null;
};

interface MessageStore {
  chatsState: unknown;
  getChats: (id: string) => Promise<void>;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`

export const useUserStore = create<MessageStore>((set) => ({
  chatsState: {
    chats: null
  } || null,
  getChats: async (id: string) => {
    try {
      // Obtener todos los chats del usuario
      const chats = await axios.get(`${BASE_URL}/${id}`)
      // Actualiza el estado con los datos recibidos
      set(() => ({
        chatsState: {
          chats: chats.data
        }
      }))
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error)
    }
  },
  openChat: async (emailB: string) => {
    try {
      // Abrir chat
      const options = {
        headers: { 'Content-Type': 'application/json' }
      }
      const chat = await axios.post(`${BASE_URL}?to=${emailB}`, null, options)
      // Actualiza el estado con los datos recibidos
      set(() => ({
        chatsState: {
          chats: chat.data
        }
      }))
    } catch (error) {
      console.error('Error al Abrir el chat:', error)
    }
  },
  sendMessage: async (emailA: string, emailB: string, message: string) => {
    try {
      // Enviar mensaje
      const message = await axios.post(`${BASE_URL}?to=${emailB}`)
      // Actualiza el estado con los datos recibidos
      set(() => ({
        chatsState: {
          chats: message.data
        }
      }))
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
    }
  }
}))
