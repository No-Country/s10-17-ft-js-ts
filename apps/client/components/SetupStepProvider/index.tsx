'use client'
import { createContext, useState } from 'react'

interface IContext {
  step: number
  nextStep: () => void
  prevStep: () => void
  formData: any
  addData: () => void
}

export const SetupStepCTX = createContext<IContext>({} as IContext)

export function SetupStepProvider ({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<number>(1)
  const [formData, _setFormData] = useState()

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

  const addData = () => {
    // setFormData({})
  }

  return (
    <SetupStepCTX.Provider value={{ step, nextStep, prevStep, formData, addData }}>
      {children}
    </SetupStepCTX.Provider>
  )
}
