'use client'

import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { AboutYou } from 'components/SetupSteps/AboutYou'
import { YourPreferences } from 'components/SetupSteps/YourPreferences'
import { YourTastes } from 'components/SetupSteps/YourTastes'
import { YourLocation } from 'components/SetupSteps/YourLocation'
import { YourAvatar } from 'components/SetupSteps/YourAvatar'

function getCurrentStep (step: number) {
  switch (step) {
    case 1:
      return <AboutYou />
    case 2:
      return <YourPreferences />
    case 3:
      return <YourTastes />
    case 4:
      return <YourLocation />
    case 5:
      return <YourAvatar />
    default:
      return <AboutYou />
  }
}

export default function SetupAccount () {
  const { step } = useSetupSteps()

  return (
    <section className={style.container}>
      {getCurrentStep(step)}
    </section>
  )
}
