import { useSetupSteps } from 'hooks/useSetupSteps'

export function YourLocation () {
  const { nextStep, prevStep } = useSetupSteps()
  return (
    <>
    4
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </>
  )
}
