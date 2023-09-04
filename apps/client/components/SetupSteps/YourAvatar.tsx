import { useSetupSteps } from 'hooks/useSetupSteps'

export function YourAvatar () {
  const { nextStep, prevStep } = useSetupSteps()
  return (
    <>
    5
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </>
  )
}
