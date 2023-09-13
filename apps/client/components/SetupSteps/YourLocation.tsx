import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
import { useState } from 'react'
interface FormFields {
  latitude: number
  longitude: number
}

export function YourLocation () {
  const { nextStep, prevStep } = useSetupSteps()
  const [error, setError] = useState(false)
  const { imperativeChange } = useFormFields<FormFields>()

  const onNextStep = () => {
  //
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function success (pos: {coords: {latitude: unknown; longitude: unknown; accuracy: unknown}}) {
      const { latitude, longitude } = pos.coords
      console.log(latitude, longitude)
      imperativeChange('latitude', latitude as string)
      imperativeChange('longitude', longitude as string)
      nextStep()
    }

    function error (err: {code: number; message: string}) {
      setError(true)
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tu ubicación</h3>
        <small>4/5</small>
      </div>
      <div className={style.form}>
        <div className={style.location}>
          <Image className={style.location__image} src={'/images/map.png'} alt='map' width={390} height={292}/>
          <p>Para usar wave es necesario que permitas tu ubicación</p>
          <a href="#">Saber más</a>
        </div>

        {error && <p className={style.form__error}>Debes permitir tu ubicación para poder utilizar Wave.</p>}

        <button onClick={onNextStep} className={style.form__next}>Permitir localización</button>
      </div>

    </>
  )
}
