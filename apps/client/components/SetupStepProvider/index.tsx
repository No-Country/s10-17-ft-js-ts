'use client'
import { createContext, useEffect, useState } from 'react'
import { type User, type Category } from 'types'
import { useSession } from 'hooks/useSession'

interface IContext {
  step: number
  nextStep: () => void
  prevStep: () => void
  formData: Partial<User> | null
  addData: (_data: Partial<IContext['formData']>) => void
  setCategories: (_data: Category[]) => void
}

export const SetupStepCTX = createContext<IContext>({} as IContext)

export function SetupStepProvider ({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<Partial<IContext['formData']> | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const { session } = useSession()

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const addData = (data: IContext['formData']) => {
    if (formData) {
      setFormData({ ...formData, ...data })
    } else {
      setFormData(data)
    }
  }

  useEffect(() => {
    if (categories) {
      const toSendCategories: Category[] = []

      Object.entries(categories).forEach(([key, value]) => {
        // @ts-expect-error Enum error (server should accept this value)
        toSendCategories.push({ name: key, rate: 4.5, pins: value })
      })

      console.log(toSendCategories, 'toSendCategories')
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/categorys`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        method: 'PUT',
        body: JSON.stringify(toSendCategories)
      })
        .then((res) => res.ok && nextStep())
        .catch(console.error)
    }
    nextStep()
  }, [categories])

  return (
    <SetupStepCTX.Provider value={{ step, nextStep, prevStep, formData, addData, setCategories }}>
      {children}
    </SetupStepCTX.Provider>
  )
}
