import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IDateInput } from "../interface";

interface DateInputProps {
  days : number
  output? : Function
  label? : string
}

const DateInput = forwardRef<IDateInput, DateInputProps>(({days, output, label}, ref) => {

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    if (!output)
      return

    output()
  }, [year, month, day])

  useImperativeHandle(
    ref,
    () => ({
      resetValue,
      getValue,
    })
  )

  const resetValue = () => {
    const date = new Date();
    
    date.setDate(date.getDate() - days);
    
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0')


    setYear(year)
    setMonth(month)
    setDay(day)
  }

  const getValue = () => {
    const givenDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    const timeDifference = today.getTime() - givenDate.getTime();
  
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }
  

  useEffect(() => {
    resetValue()
  }, [days])

  const handleYearChange = (e : React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value

    value = value.replace(/\D/g, '');

    if (value.length > 4) {
      value = value.substring(value.length-4, value.length);
    } else if (value.length < 4) {
      value = value.padStart(4, '0');
    }

    setYear(value)
  }

  const handleMonthChange = (e : React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value

    value = value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(value.length-2, value.length);
    } else if (value.length < 2) {
      value = value.padStart(2, '0');
    }

    setMonth(value)
  }

  const handleDayChange = (e : React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value

    value = value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(value.length-2, value.length);
    } else if (value.length < 2) {
      value = value.padStart(2, '0');
    }

    setDay(value)
  }

  return (
    <div className='flex gap-2 items-center'>
      {label && <span>{label}</span>}
      <div className="border border-gray-400 p-2 rounded-xl  w-32 flex justify-around">
        <input type='text' placeholder='YYYY' className='w-10 text-center' value={year} onChange={handleYearChange} />
        <span>-</span>
        <input type='text' placeholder='MM' className='w-6 text-center' value={month} onChange={handleMonthChange} />
        <span>-</span>
        <input type='text' placeholder='JJ' className='w-6 text-center' value={day} onChange={handleDayChange} />
      </div>
    </div>
  )
})

export default DateInput