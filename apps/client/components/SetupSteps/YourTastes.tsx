import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
import { Checkbox } from './Checkbox'
import { SearchPins } from './SearchPins'

interface FormFields {
  interests: string
  pins: any
}

export function YourTastes () {
  const { nextStep, prevStep } = useSetupSteps()
  const { fields, imperativeChange } = useFormFields<FormFields>()

  console.log(fields)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  const handleCheckbox = (name: string) => {
    if (fields?.interests) {
      const interests = fields?.interests.split(',')
      if (interests.includes(name)) {
        const newInterests = interests.filter((interest) => interest !== name)
        imperativeChange('interests', newInterests.join(','))
      } else {
        imperativeChange('interests', `${fields?.interests},${name}`)
      }
    } else {
      imperativeChange('interests', name)
    }
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tus gustos</h3>
        <small>3/5</small>
      </div>
      <div className={style.form} onSubmit={handleSubmit}>
        <span className={style.form__describedGroup}>
          <p>Elige tus intereses</p>

          <div className={style['form__checkboxGroup-twice']}>
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Anime' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Juegos' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Peliculas' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Musica' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Series' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Otros' multiple={true} />
          </div>
        </span>

        <span className={style.form__describedGroup}>
          <p>Elige al menos 3 pines</p>
          <SearchPins />
        </span>
        <button onClick={nextStep} className={style.form__next}>Continuar</button>
      </div>

    </>
  )
}
