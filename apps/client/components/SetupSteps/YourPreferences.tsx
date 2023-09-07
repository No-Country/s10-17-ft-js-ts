import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
import { Select } from './Select'
import { Checkbox } from './Checkbox'

interface FormFields {
  relation: string
  genre: string
}

export function YourPreferences () {
  const { nextStep, prevStep } = useSetupSteps()
  const { fields, handleChange, imperativeChange } = useFormFields<FormFields>()
  console.log(fields)
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  const handleCheckbox = (name: string) => {
    imperativeChange('genre', name)
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tus preferencias</h3>
        <small>2/5</small>
      </div>
      <div className={style.form} onSubmit={handleSubmit}>
        <span className={style.form__describedGroup}>
          <p>¿Qué tipo de conexión buscas?</p>
          <small>Elige el tipo de relación que buscas aquí</small>
          <Select name='relation' placeholder='Seleccionar' options={['XD no se', 'No se 2']} disabled={false} handleChange={handleChange} />
        </span>

        <span className={style.form__describedGroup}>
          <p>¿Qué te mostramos?</p>
          <small>Elige el género que se mostrará en tu inicio</small>

          <div className={style.form__checkboxGroup}>
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.genre} name='Hombres' />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.genre} name='Mujeres' />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.genre} name='Todos' />
          </div>
        </span>
        <button onClick={nextStep} className={style.form__next}>Continuar</button>
      </div>

    </>
  )
}
