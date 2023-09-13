'use client'
import { createContext, useState } from 'react'
import { User } from 'types'

interface IContext {
  step: number
  nextStep: () => void
  prevStep: () => void
  formData: Partial<User> | null
  addData: (_data: Partial<IContext['formData']>) => void
}

export const SetupStepCTX = createContext<IContext>({} as IContext)

export function SetupStepProvider ({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<Partial<IContext['formData']> | null>(null)

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
  console.log(formData)
  return (
    <SetupStepCTX.Provider value={{ step, nextStep, prevStep, formData, addData }}>
      {children}
    </SetupStepCTX.Provider>
  )
}
