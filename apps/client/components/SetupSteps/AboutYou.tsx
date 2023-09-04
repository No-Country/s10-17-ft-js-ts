import style from './style.module.scss'
// import { useSetupSteps } from 'hooks/useSetupSteps'
import { Input } from './Input'
import { useFormFields } from 'hooks/useFormFields'
// import { Select } from './Select'

export function AboutYou () {
  // const { nextStep, prevStep } = useSetupSteps()
  const { fields: _fieldNotUsed, handleChange } = useFormFields()

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
          <Input handleChange={handleChange} label='Nombre' placeholder='Nombre'/>
          <Input handleChange={handleChange} label='Apellido' placeholder='Apellido'/>
        </div>
      </form>
      {/* <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button> */}
    </>
  )
}
