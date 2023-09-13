import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { Input } from './Input'
import { useFormFields } from 'hooks/useFormFields'
import { Birthday } from './Birthday'
import { Select } from './Select'
import { useState } from 'react'

interface FormFields {
  firstName: string
  lastName: string
  gender: string
  description: string

  day: string
  month: string
  year: string
}

type FormFieldsKeys = keyof FormFields

export function AboutYou () {
  const { nextStep, addData } = useSetupSteps()
  const { fields, handleChange } = useFormFields<FormFields>()
  const [error, setError] = useState(false)

  const meses = {
    Enero: '01',
    Febrero: '02',
    Marzo: '03',
    Abril: '04',
    Mayo: '05',
    Junio: '06',
    Julio: '07',
    Agosto: '08',
    Septiembre: '09',
    Octubre: '10',
    Noviembre: '11',
    Diciembre: '12'
  }

  const onNextStep = () => {
    const requiredFields: FormFieldsKeys[] = ['day', 'month', 'year', 'description', 'firstName', 'gender', 'lastName']
    const isFormValid = requiredFields.every((field) => fields[field as FormFieldsKeys])

    if (!isFormValid) {
      setError(true)
    } else {
      // @ts-expect-error the next error is not a problem, because we are sure that the fields are not null
      const birthdate = `${fields.year}-${meses[fields.month]}-${fields.day.length === 1 ? `0${fields.day}` : fields.day}` as Date
      const { day: _day, month: _month, year: _year, ...rest } = fields
      console.log(birthdate)
      addData({ ...rest, birthdate })
      nextStep()
    }
  }

  return (
    <>
      <div className={style.data}>
        <h3>Sobre ti</h3>
        <small>1/5</small>
      </div>
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <div className={style.form__group}>
          <Input name='firstName' handleChange={handleChange} label='Nombre' placeholder='Nombre'/>
          <Input name='lastName' handleChange={handleChange} label='Apellido' placeholder='Apellido'/>
        </div>

        <span>
          <label>Fecha de Nacimiento</label>
          <div className={style.form__group}>
            <Birthday handleUpdate={handleChange} {...fields} />
          </div>
        </span>

        <span>
          <label>Género</label>
          <Select name='gender' handleChange={handleChange} options={['Hombre', 'Mujer', 'No binario', 'Otros']} placeholder='Género' disabled={false} />
        </span>

        <span>
          <label>Cuéntanos sobre ti</label>
          <textarea onChange={handleChange} name="description" className={style.about} cols={30} rows={10}></textarea>
        </span>

        {error ? <p className={style.form__error}>Por favor completa todos los campos</p> : null}

        <button onClick={onNextStep} className={style.form__next}>Continuar</button>
      </form>

    </>
  )
}
