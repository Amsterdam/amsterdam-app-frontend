import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {LayoutAnimation} from 'react-native'

const initialState = {
  changeContent: () => {},
  changeVariant: () => {},
  changeVisibility: () => {},
  content: undefined,
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
  changeVariant: (variant: Variant) => void
  changeVisibility: (visibility: boolean) => void
  content?: Content
  isVisible: boolean
  variant?: Variant
}

export const AlertContext = createContext<Context>(initialState)

type Props = {
  children: ReactNode
}

export const AlertProvider = ({children}: Props) => {
  const [content, setContent] = useState<Content | undefined>()
  const [variant, setVariant] = useState<Variant>()
  const [isVisible, setVisibility] = useState<boolean>(false)

  const changeContent = useCallback((n: Content) => {
    setContent(n)
  }, [])

  const changeVariant = useCallback((v: Variant) => {
    setVariant(v)
  }, [])

  const changeVisibility = useCallback((visibility: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setVisibility(visibility)
  }, [])

  useEffect(() => {
    changeContent(undefined)
  }, [changeContent])

  useEffect(() => {
    content && changeVisibility(true)
  }, [changeVisibility, content])

  const contextValue = useMemo(
    () => ({
      changeContent,
      changeVariant,
      changeVisibility,
      content,
      variant,
      isVisible,
    }),
    [
      changeContent,
      changeVariant,
      changeVisibility,
      content,
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
