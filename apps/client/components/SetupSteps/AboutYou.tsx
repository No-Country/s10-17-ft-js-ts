import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { Input } from './Input'
import { useFormFields } from 'hooks/useFormFields'
import { Birthday } from './Birthday'
import { Select } from './Select'

interface FormFields {
  name: string
  lastName: string
  birthDay: string
  birthMonth: string
  birthYear: string
  gender: string
  about: string
}

export function AboutYou () {
  const { nextStep } = useSetupSteps()
  const { fields, handleChange } = useFormFields<FormFields>()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className={style.data}>
        <h3>Sobre ti</h3>
        <small>1/5</small>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.form__group}>
          <Input name='name' handleChange={handleChange} label='Nombre' placeholder='Nombre'/>
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
          <Select name='gender' handleChange={handleChange} options={['Masculino', 'Femenino']} placeholder='Género' disabled={false} />
        </span>

        <span>
          <label>Cuéntanos sobre ti</label>
          <textarea onChange={handleChange} name="about" className={style.about} cols={30} rows={10}></textarea>
        </span>

        <button onClick={nextStep} className={style.form__next}>Continuar</button>
      </form>

    </>
  )
}
