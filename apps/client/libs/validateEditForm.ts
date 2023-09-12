/* eslint-disable no-unused-vars */
import { AboutForm } from 'types'

export function handleAboutForm (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, form: AboutForm, setForm: (form: AboutForm) => void) {
  const errors = structuredClone(form.errors)
  switch (e.target.name) {
    case 'firstname':
      if (e.target.value.length < 3) {
        errors.firstname = 'El nombre debe tener al menos 3 caracteres'
      } else {
        errors.firstname = ''
      }
      break
    case 'lastname':
      if (e.target.value.length < 3) {
        errors.lastname = 'El apellido debe tener al menos 3 caracteres'
      } else {
        errors.lastname = ''
      }
      break
    case 'description':
      if (e.target.value.length < 3) {
        errors.description = 'La descripción debe tener al menos 3 caracteres'
      } else {
        errors.description = ''
      }
      break
  }

  setForm({
    data: {
      ...form.data,
      [e.target.name]: e.target.value
    },
    errors
  })
}
