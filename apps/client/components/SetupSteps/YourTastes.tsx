/* eslint-disable @next/next/no-img-element */

import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import { useFormFields } from 'hooks/useFormFields'
import Image from 'next/image'
import { Checkbox } from './Checkbox'
import { SearchPins } from './SearchPins'
import { useState } from 'react'
import { type Category } from 'types'
interface FormFields {
  interests: string
  categories: Category['pins']
}

export function YourTastes () {
  const { nextStep, prevStep, addData: _addData } = useSetupSteps()
  const { fields, imperativeChange } = useFormFields<FormFields>()
  const [error, setError] = useState(false)
  const [pins, setPins] = useState<Category['pins']>([])
  const [selected, setSelected] = useState<Category['pins']>([])

  const onNextStep = () => {
    if (selected.length >= 3) {
      const groupByCategory = selected.reduce((group: Category['pins'], pin: Category['pins']) => {
        const { category } = pin
        group[category] = group[category] ?? []
        group[category].push(pin)
        return group
      }, {})
      imperativeChange('categories', groupByCategory)
      // addData()
      nextStep()
    } else {
      setError(true)
    }
  }

  const deletePins = () => {
    setPins([...pins, ...selected])
    setSelected([])
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

  const handleSelect = (pin: Category['pins']) => {
    if (selected.includes(pin)) {
      const newSelected = selected.filter((item: Category['pins']) => item.name !== pin.name)
      setSelected(newSelected)
    } else {
      setSelected([...selected, pin])
      setPins(pins.filter((item: Category['pins']) => item.name !== pin.name))
      console.log(selected)
    }
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tus gustos</h3>
        <small>3/5</small>
      </div>
      <div className={style.form} onSubmit={(e) => e.preventDefault()}>
        <span className={style.form__describedGroup}>
          <p>Elige tus intereses</p>

          <div className={style['form__checkboxGroup-twice']}>
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Anime' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Juegos' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Peliculas' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Musica' multiple={true} />
            <Checkbox addChecked={handleCheckbox} currentChecked={fields?.interests} name='Series' multiple={true} />
          </div>
        </span>

        <span className={style.form__describedGroup}>
          <p>Elige al menos 3 pines</p>
          {fields?.interests?.length > 0 ? <SearchPins setPins={setPins} selected={fields.interests} /> : null}
          {selected.length > 0 ? <b className={style.delete} onClick={deletePins}>Borrar todos</b> : null}
          <p className={style.count}>{selected.length}/3</p>
        </span>

        {pins.length > 0
          ? (
        <div className={style.form__pins}>
          {
            pins.map((pin: Category['pins'], i: number) => (
              <div key={pin.name + i} className={style['form__pins--item'] + ' ' + pin.category} onClick={() => handleSelect(pin)} title={pin.name}>
                <img alt={pin.name} src={pin.imgUrl} />
              </div>
            ))}
        </div>
            )
          : null}

        {error ? <p className={style.form__error}>Por favor elige 3 o mas pines</p> : null}

        <button onClick={onNextStep} className={style.form__next}>Continuar</button>
      </div>

    </>
  )
}
