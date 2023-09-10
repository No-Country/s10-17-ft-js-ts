import { useContext } from 'react'
import { SetupStepCTX } from 'components/SetupStepProvider'

export const useSetupSteps = () => {
  const context = useContext(SetupStepCTX)

  return context
}
