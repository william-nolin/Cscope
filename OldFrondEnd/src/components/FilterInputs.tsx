import { Check, RotateCcw } from 'lucide-react'
import { dayFilters } from '../config/filter'
import { useFilter } from '../providers/FilterProvider'
import DateInput from './DateInput'
import { useRef, useState } from 'react'
import { IDateInput } from '../interface'

const FilterInputs = () => {

  const {daysFrom, daysTo, setPrefabDays, setDaysFrom, setDaysTo} = useFilter()

  const inputFromElement = useRef<IDateInput>(null)
  const inputToElement = useRef<IDateInput>(null)

  const [changesPending, setChangesPending] = useState(false)

  const handleReset = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    inputFromElement.current?.resetValue()
    inputToElement.current?.resetValue()
    setChangesPending(false)
  }

  const handleApply = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (inputFromElement.current && inputToElement.current){
      setDaysFrom(inputFromElement.current.getValue())
      setDaysTo(inputToElement.current.getValue())
      setChangesPending(false)
    }
  }

  const handleChanges = () => {
    if (!inputFromElement.current || !inputToElement.current)
      return

    const fromVal = inputFromElement.current.getValue()
    const toVal = inputToElement.current.getValue()

    setChangesPending(fromVal !== daysFrom || toVal !== daysTo)
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='border border-gray-400 divide-x divide-gray-400 rounded-xl overflow-hidden'>
        {dayFilters.map((dayFilter) => (
          <button
            key={dayFilter.value}
            onClick={() => {setPrefabDays(dayFilter.value)}}
            className={`${dayFilter.value == daysFrom && daysTo == 0 ? 'filter-selected' : ''} px-3 py-2 hover:bg-gray-100`}
          >
            {dayFilter.label}
          </button>
        ))}
      </div>
      <DateInput output={handleChanges} days={daysFrom} label='De' ref={inputFromElement} />
      <DateInput output={handleChanges} days={daysTo} label='À' ref={inputToElement} />
      <button disabled={!changesPending} onClick={handleApply} className='bg-green-500 p-2 rounded-xl text-white disabled:bg-gray-500'><Check /></button>
      <button disabled={!changesPending} onClick={handleReset} className='bg-red-500 p-2 rounded-xl text-white disabled:bg-gray-500'><RotateCcw/></button>
    </div>
  )
}

export default FilterInputs