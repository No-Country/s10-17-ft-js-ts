import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
import { Select } from './Select'
import { Checkbox } from './Checkbox'
import { useState } from 'react'

interface FormFields {
  lookingFor: string
  wantsGenre: string
}

type FormFieldsKeys = keyof FormFields

export function YourPreferences () {
  const { nextStep, prevStep, addData } = useSetupSteps()
  const [error, setError] = useState(false)
  const { fields, handleChange, imperativeChange } = useFormFields<FormFields>()

  const handleCheckbox = (name: string) => {
    imperativeChange('wantsGenre', name)
  }

  const onNextStep = () => {
    const requiredFields: FormFieldsKeys[] = ['lookingFor', 'wantsGenre']
    const isFormValid = requiredFields.every((field) => fields[field as FormFieldsKeys])

    if (!isFormValid) {
      setError(true)
    } else {
      addData(fields)
      nextStep()
    }
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tus preferencias</h3>
        <small>2/5</small>
      </div>
      <div className={style.form}>
        <span className={style.form__describedGroup}>
          <p>¿Qué tipo de conexión buscas?</p>
          <small>Elige el tipo de relación que buscas aquí</small>
          <Select name='lookingFor' placeholder='Seleccionar' options={['Amistad', 'Relación monógama', 'Ambos']} disabled={false} handleChange={handleChange} />
        </span>

        <span className={style.form__describedGroup}>
          <p>¿Qué te mostramos?</p>
          <small>Elige el género que se mostrará en tu inicio</small>

          <div className={style.form__checkboxGroup}>
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.wantsGenre} name='Hombres' />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.wantsGenre} name='Mujeres' />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.wantsGenre} name='Todos' />
          </div>
        </span>

        {error ? <p className={style.form__error}>Por favor completa todos los campos</p> : null}

        <button onClick={onNextStep} className={style.form__next}>Continuar</button>
      </div>

    </>
  )
}
