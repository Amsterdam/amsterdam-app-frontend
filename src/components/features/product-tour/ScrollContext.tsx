import {createContext} from 'react'
import {View} from 'react-native'

type ScrollContext = {
  isElementVisible: boolean
  setElementRef: (node: View) => void
}

export const ScrollContext = createContext<ScrollContext | null>(null)
