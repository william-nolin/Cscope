import React, { createContext, useContext, useState } from 'react'
import { dayFilters } from '../config/filter'

interface IFilterContext {
  daysFrom: number
  daysTo: number
  setDaysFrom:  React.Dispatch<React.SetStateAction<number>>
  setDaysTo: React.Dispatch<React.SetStateAction<number>>
}

const defaultDays = dayFilters.filter((dayFilter) => dayFilter.default)[0]?.value ?? dayFilters[0].value
const FilterContext = createContext({} as IFilterContext)

const FilterProvider = ({children} : {children: React.ReactNode}) => {

  
  const [daysFrom, setDaysFrom] = useState(defaultDays)
  const [daysTo, setDaysTo] = useState(0)


  return (
    <FilterContext.Provider value={{daysFrom, daysTo, setDaysFrom, setDaysTo}}>
      {children}
    </FilterContext.Provider>
  )
}

const useFilter = () => {
  const {daysFrom, daysTo, setDaysFrom, setDaysTo} = useContext(FilterContext)

  const setPrefabDays = (days : number) => {
    setDaysFrom(days)
    setDaysTo(0)
  }

  return {daysFrom, daysTo, setDaysFrom, setDaysTo, setPrefabDays}
}

export {FilterProvider, useFilter}