export interface User { // Could change in the future
  firstName: string
  lastName: string
  email: string
  description: string
  images: string[]
  birthdate: string
  likedBy: string[]
  gender: string
  wantsGender: string
  id: string
  ageRange: number[]
  isVerified: boolean
}

export interface ISession {
  access_token: string
  user?: User
}
