import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

type SearchFieldContextType = {
  amount: number
  setSearchFieldValue: Dispatch<SetStateAction<string>>
  type: string
  value: string
}

const initialValue: SearchFieldContextType = {
  amount: 0,
  type: '',
  value: '',
  setSearchFieldValue: () => null,
}

export const SearchFieldContext =
  createContext<SearchFieldContextType>(initialValue)

type Props = {
  amount?: number
  children: ReactNode
  type?: string
}

export const SearchFieldProvider = ({children, amount, type}: Props) => {
  const [searchFieldValue, setSearchFieldValue] = useState('')
  const [providerValue, setProviderValue] = useState(initialValue)

  useEffect(() => {
    setProviderValue({
      amount: amount ?? 0,
      type: type ?? '',
      value: searchFieldValue,
      setSearchFieldValue: setSearchFieldValue,
    })
  }, [amount, searchFieldValue, setProviderValue, type])

  return (
    <SearchFieldContext.Provider value={providerValue}>
      {children}
    </SearchFieldContext.Provider>
  )
}
