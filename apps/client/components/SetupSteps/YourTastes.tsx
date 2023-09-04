import { useSetupSteps } from 'hooks/useSetupSteps'

export function YourTastes () {
  const { nextStep, prevStep } = useSetupSteps()
  return (
    <>
    3
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </>
  )
}
