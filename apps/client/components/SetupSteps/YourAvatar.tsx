import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
interface FormFields {
  interests: string
  pins: any
}

export function YourAvatar () {
  const { nextStep, prevStep } = useSetupSteps()
  const { ..._all } = useFormFields<FormFields>()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tu avatar</h3>
        <small>5/5</small>
      </div>
      <div className={style.form} onSubmit={handleSubmit}>
        <span className={style.avatar}>
          <p>Elige un avatar de tu preferencia</p>
        </span>
        <button onClick={nextStep} className={style.form__next}>Finalizar</button>
      </div>

    </>
  )
}
