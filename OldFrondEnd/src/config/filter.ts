import { DayFilter } from "../interface";

export const dayFilters : DayFilter[] = [
  {
    label: '1a',
    value: 365
  },
  {
    label: '3m',
    value: 91
  },
  {
    label: '1m',
    value: 30,
    default: true
  },
  {
    label: '7j',
    value: 7
  },
  {
    label: '1j',
    value: 1
  }
]