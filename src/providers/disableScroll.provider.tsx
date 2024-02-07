import {Dispatch, ReactNode} from 'react'
import {createContext, useMemo, useState} from 'react'

type DisableScrollContextType = {
  scrollDisabled: boolean
  setScrollDisabled: Dispatch<React.SetStateAction<boolean>>
}

export const DisableScrollContext = createContext<DisableScrollContextType>({
  scrollDisabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setScrollDisabled: () => {},
})

type Props = {
  children: ReactNode
}

export const DisableScrollProvider = ({children}: Props) => {
  const [scrollDisabled, setScrollDisabled] = useState<boolean>(false)

  const value = useMemo(
    () => ({scrollDisabled, setScrollDisabled}),
    [scrollDisabled, setScrollDisabled],
  )

  return (
    <DisableScrollContext.Provider value={value}>
      {children}
    </DisableScrollContext.Provider>
  )
}
