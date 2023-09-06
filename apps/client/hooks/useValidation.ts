export function useValidator () {
  const isPasswordValid = (password: string) => {
    const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    return password && password.length >= 8 && check.test(password.trim())
  }

  const isEmailValid = (email: string) => {
    const check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email && check.test(email)
  }

  function validateField<T extends object, K extends keyof T> (key: K, data: T) {
    switch (key) {
      case 'password':
        return isPasswordValid(data[key]) ? null : 'Debe conteneral menos una minúscula, una mayúscula, un número y un caracter especial.'
      case 'email':
        return isEmailValid(data[key]) ? null : 'El email es inválido'
      default:
        return 'Ha ocurrido un error con este elemento'
    }
  }

  function validator<T extends object> (data: T) {
    const error: Record<string, string> = {}

    Object.keys(data).forEach((key) => {
      const errorMessage = validateField(key as keyof T, data)
      if (errorMessage) error[key] = errorMessage
    })

    return Object.keys(error).length ? error : null
  }

  return validator
}
