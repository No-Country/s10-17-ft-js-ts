/* eslint-disable no-unused-vars */
/* eslint-disable @nx/enforce-module-boundaries */
import { Message } from './../../server/src/chat/entities/message.entity'
import axios from 'axios'
import { create } from 'zustand'
import { io } from 'socket.io-client'

// Define la estructura de UserDto
interface Chats {
  chats: [];
  chatSelected: string;
  chat: unknown;
};

interface ChatData {
  data: Chats['chat'];
}

interface MessageStore {
  chats: [],
  chatSelected: '',
  chat: ''
  getChats: (id: string) => Promise<void>;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`

export const useChatsStore = create<MessageStore>((set) => ({
  chats: [],
  chatSelected: '',
  chat: '',
  getChats: async (access_token: string) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }

    try {
      // Obtener todos los chats del usuario
      const chats = await axios.get(`${BASE_URL}/all`, options)

      // Actualiza el estado con los datos recibidos
      set(() => ({
        chats: chats.data
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
        chats: chat.data
      }))
    } catch (error) {
      console.error('Error al Abrir el chat:', error)
    }
  },
  sendMessage: async (emailA: string, emailB: string, message: string) => {
    try {
      // Enviar mensaje
      const socket = io(`${BASE_URL}`, {
        reconnectionDelayMax: 10000
      })

      socket.emit('message', {
        emailSender: 'emailA',
        emailReceiver: 'emailB',
        content: 'Hola'
      })
      // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
    }
  },
  onMessages: async () => {
    const socket = io(`${BASE_URL}`, {
      reconnectionDelayMax: 10000
    })

    socket.on('messageSend', (msg: Message) => {
      // Actualiza el estado con los datos recibidos
    })
  }
  // setChatSelected (emailB: string) {
  //   set(() => ({
  //     chatSelected: emailB
  //   }))
  // }
}))
