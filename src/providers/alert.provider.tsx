import React, {createContext, useState} from 'react'

const initialState = {
  content: {
    title: undefined,
    text: undefined,
  },
  variant: undefined,
}

type Content = {
  title: string | undefined
  text: string | undefined
}

type Variant = 'success' | 'failure'

type Context = {
  changeContent?: ({title, text}: {title: string; text: string}) => void
  changeVariant?: (variant: Variant) => void
  content?: Content
  variant?: Variant
}

export const AlertContext = createContext<Context>(initialState)

export const AlertProvider = ({children}: {children: React.ReactNode}) => {
  const [content, setContent] = useState<Content>()
  const [variant, setVariant] = useState<Variant>()

  const changeContent = (n: Content) => {
    setContent(n)
  }

  const changeVariant = (v: Variant) => {
    setVariant(v)
  }

  return (
    <AlertContext.Provider
      value={{
        changeContent,
        changeVariant,
        content,
        variant,
      }}>
      {children}
    </AlertContext.Provider>
  )
}
