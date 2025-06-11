import {
  type Dispatch,
  type ReactNode,
  createContext,
  useMemo,
  useState,
} from 'react'

type ScreenContextType = {
  nativeScreenHeader: boolean

  scrollDisabled: boolean
  setScrollDisabled: Dispatch<React.SetStateAction<boolean>>
}

export const ScreenContext = createContext<ScreenContextType>({
  nativeScreenHeader: false,
  scrollDisabled: false,
  setScrollDisabled: () => null,
})

type Props = {
  children: ReactNode
  nativeScreenHeader?: boolean
}

export const ScreenProvider = ({
  children,
  nativeScreenHeader = true,
}: Props) => {
  const [scrollDisabled, setScrollDisabled] = useState<boolean>(false)

  const value = useMemo(
    () => ({scrollDisabled, setScrollDisabled, nativeScreenHeader}),
    [scrollDisabled, setScrollDisabled, nativeScreenHeader],
  )

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  )
}
