import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
interface FormFields {
  interests: string
  pins: any
}

export function YourLocation () {
  const { nextStep, prevStep } = useSetupSteps()
  const { ..._all } = useFormFields<FormFields>()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tu ubicación</h3>
        <small>4/5</small>
      </div>
      <div className={style.form} onSubmit={handleSubmit}>
        <div className={style.location}>
          <Image className={style.location__image} src={'/images/map.png'} alt='map' width={390} height={292}/>
          <p>Para usar wave es necesario que permitas tu ubicación</p>
          <a href="#">Saber más</a>
        </div>
        <button onClick={nextStep} className={style.form__next}>Permitir localización</button>
      </div>

    </>
  )
}
