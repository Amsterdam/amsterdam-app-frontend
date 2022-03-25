import {Insets} from 'react-native'

type Signature = (size: number) => Insets

export const allInsets: Signature = size => ({
  top: size,
  bottom: size,
  left: size,
  right: size,
})
