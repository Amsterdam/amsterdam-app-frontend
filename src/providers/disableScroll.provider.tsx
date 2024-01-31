import {Dispatch, ReactNode} from 'react'
import {createContext, useMemo, useState} from 'react'

type DisableScrollContextType = {
  isDisabledScroll: boolean
  setIsDisabledScroll: Dispatch<React.SetStateAction<boolean>>
}

export const DisableScrollContext = createContext<DisableScrollContextType>({
  isDisabledScroll: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsDisabledScroll: () => {},
})

type Props = {
  children: ReactNode
}

export const DisableScrollProvider = ({children}: Props) => {
  const [isDisabledScroll, setIsDisabledScroll] = useState<boolean>(false)

  const value = useMemo(
    () => ({isDisabledScroll, setIsDisabledScroll}),
    [isDisabledScroll, setIsDisabledScroll],
  )

  return (
    <DisableScrollContext.Provider value={value}>
      {children}
    </DisableScrollContext.Provider>
  )
}
