import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

const initMaxHeight = 100

const initialState = {
  changeContent: () => {},
  changeMaxHeight: () => {},
  changeVariant: () => {},
  changeVisibility: () => {},
  content: undefined,
  maxHeight: initMaxHeight,
  isVisible: false,
  variant: undefined,
}

type Content =
  | {
      title: string | undefined
      text: string | undefined
    }
  | undefined

type Variant = 'success' | 'failure'

type Context = {
  changeContent: (content: Content) => void
  changeMaxHeight: (height: number) => void
  changeVariant: (variant: Variant) => void
  changeVisibility: (visibility: boolean) => void
  content?: Content
  maxHeight: number
  isVisible: boolean
  variant?: Variant
}

export const AlertContext = createContext<Context>(initialState)

export const AlertProvider = ({children}: {children: React.ReactNode}) => {
  const [content, setContent] = useState<Content | undefined>()
  const [maxHeight, setMaxHeight] = useState(initMaxHeight)
  const [variant, setVariant] = useState<Variant>()
  const [isVisible, setVisibility] = useState<boolean>(false)

  const changeContent = useCallback((n: Content) => {
    setContent(n)
  }, [])

  const changeMaxHeight = useCallback((height: number) => {
    setMaxHeight(height)
  }, [])

  const changeVariant = useCallback((v: Variant) => {
    setVariant(v)
  }, [])

  const changeVisibility = useCallback((visibility: boolean) => {
    setVisibility(visibility)
  }, [])

  useEffect(() => {
    changeContent(undefined)
  }, [changeContent])

  useEffect(() => {
    content && setVisibility(true)
  }, [content])

  const contextValue = useMemo(
    () => ({
      changeContent,
      changeMaxHeight,
      changeVariant,
      changeVisibility,
      content,
      maxHeight,
      variant,
      isVisible,
    }),
    [
      changeContent,
      changeMaxHeight,
      changeVariant,
      changeVisibility,
      content,
      maxHeight,
      variant,
      isVisible,
    ],
  )

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  )
}
