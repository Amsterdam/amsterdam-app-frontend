import {createContext, type Dispatch, type SetStateAction} from 'react'

export type SearchFieldContextType = {
  amount: number
  setSearchFieldValue: Dispatch<SetStateAction<string>>
  type: string
  value: string
}

export const initialValue: SearchFieldContextType = {
  amount: 0,
  type: '',
  value: '',
  setSearchFieldValue: () => null,
}

export const SearchFieldContext =
  createContext<SearchFieldContextType>(initialValue)
