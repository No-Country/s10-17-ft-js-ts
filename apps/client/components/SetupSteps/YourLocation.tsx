import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import Image from 'next/image'
import { useState } from 'react'

export function YourLocation () {
  const { nextStep, prevStep, addData } = useSetupSteps()
  const [error, setError] = useState(false)

  const onNextStep = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function success (pos: {coords: {latitude: unknown; longitude: unknown; accuracy: unknown}}) {
      const { latitude, longitude } = pos.coords
      addData({ latitude: latitude as number, longitude: longitude as number })
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
          <Image className={style.location__image} src={'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694614444/mapa_kuum4w.png'} alt='map' width={390} height={292}/>
          <p>Para usar wave es necesario que permitas tu ubicación</p>
          <a href="#">Saber más</a>
        </div>

        {error && <p className={style.form__error}>Debes permitir tu ubicación para poder utilizar Wave.</p>}

        <button onClick={onNextStep} className={style.form__next}>Permitir localización</button>
      </div>

    </>
  )
}
