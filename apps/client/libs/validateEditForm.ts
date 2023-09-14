/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-unused-vars */
import { User as UserState } from 'store/user'
import { UserDto } from '../../../libs/dto/src/lib/user/user.dto'

export function handleAboutForm (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  form: UserDto | null,
  setForm: (form: UserDto) => void
) {
  if (form) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
}

export function handleSelectSearchOption (e: React.ChangeEvent<HTMLInputElement>, userState: UserState | undefined, setUser: (user: UserDto) => void) {
  if (userState?.user && userState.user.lookingFor !== e.target.value) {
    setUser({
      ...userState.user,
      lookingFor: e.target.value
    })
  }
}

export function handleSelectGenreOption (e: React.ChangeEvent<HTMLInputElement>, userState: UserState | undefined, setUser: (user: UserDto) => void) {
  if (userState?.user && userState.user.wantsGender !== e.target.value) {
    setUser({
      ...userState.user,
      wantsGender: e.target.value
    })
  }
}

export function handleChageDistance (e: React.ChangeEvent<HTMLInputElement>, userState: UserState | undefined, setUser: (user: UserDto) => void, distancePicker: React.RefObject<HTMLDivElement>) {
  const value = Number(e.target.value)
  if (userState?.user) {
    setUser({
      ...userState?.user,
      zone: value
    })
  }

  if (distancePicker.current && value > 100) {
    distancePicker.current.style.left = `${e.currentTarget.clientWidth * (value / 1000) - 60}px`
  }
}

export function handleChageAge (e: React.ChangeEvent<HTMLInputElement>, userState: UserState | undefined, setUser: (user: UserDto) => void, agePicker: React.RefObject<HTMLDivElement>) {
  const value = Number(e.target.value)
  if (userState?.user) {
    setUser({
      ...userState?.user,
      ageRange: [18, value]
    })
  }

  if (agePicker.current && value > 20) {
    agePicker.current.style.left = `${e.currentTarget.clientWidth * (value / 99) - 70}px`
  }
}
