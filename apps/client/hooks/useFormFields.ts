import { useState } from 'react'

type Fields<T> = {
  [_key in keyof T]: string;
};

export function useFormFields<T> () {
  const [fields, setFields] = useState<Fields<T>>({} as Fields<T>)

  function handleChange ({ target }: { target: HTMLInputElement }) {
    const { name, value } = target
    setFields({ ...fields, [name]: value.trim() } as Fields<T>)
  }

  return { fields, handleChange }
}
