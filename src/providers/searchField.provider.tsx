import {ReactNode, createContext} from 'react'

type SearchFieldProviderContextType = {
  amount: number
  type: string
}

export const SearchFieldContext = createContext<SearchFieldProviderContextType>(
  {
    amount: 0,
    type: '',
  },
)

type Props = {
  amount?: number
  children: ReactNode
  type?: string
}

export const SearchFieldProvider = ({children, amount, type}: Props) => (
  <SearchFieldContext.Provider
    value={{
      amount: amount ?? 0,
      type: type ?? '',
    }}>
    {children}
  </SearchFieldContext.Provider>
)
