import { useMemo } from 'react'
import { Select } from './Select'

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const YEARS = Array.from({ length: 100 }, (_, i) => i + 1920)

interface Props {
  month?: string
  year?: string
  handleUpdate: ({ target }: {target: HTMLSelectElement | HTMLInputElement}) => void // eslint-disable-line no-unused-vars
}

export function Birthday ({ year, month, handleUpdate }: Props) {
  const DAYS = useMemo(() => {
    if (!month) return []
    const days = []
    const daysInMonth = new Date(Number(year), MONTHS.indexOf(month) + 1, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }, [month, year])
  return (
    <>
      <Select name='year' handleChange={handleUpdate} disabled={false} options={YEARS} placeholder='Año' />
      <Select name='month' handleChange={handleUpdate} disabled={!year} options={MONTHS} placeholder='Mes'/>
      <Select name='day' handleChange={handleUpdate} disabled={!month} options={DAYS} placeholder='Día' />
    </>
  )
}
