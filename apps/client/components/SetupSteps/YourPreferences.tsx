import { useSetupSteps } from 'hooks/useSetupSteps'

export function YourPreferences () {
  const { nextStep, prevStep } = useSetupSteps()
  return (
    <>
    2
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </>
  )
}
