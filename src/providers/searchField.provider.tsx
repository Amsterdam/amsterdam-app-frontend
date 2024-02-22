import {ReactNode, createContext, useEffect, useState} from 'react'

type SearchFieldContextType = {
  amount: number
  type: string
  value: string
}

const initialValue: SearchFieldContextType = {
  amount: 0,
  type: '',
  value: '',
}

export const SearchFieldContext =
  createContext<SearchFieldContextType>(initialValue)

type Props = {
  amount?: number
  children: ReactNode
  type?: string
}

export const SearchFieldProvider = ({children, amount, type}: Props) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue({
      amount: amount ?? 0,
      type: type ?? '',
      value: '',
    })
  }, [amount, setValue, type])

  return (
    <SearchFieldContext.Provider value={value}>
      {children}
    </SearchFieldContext.Provider>
  )
}
