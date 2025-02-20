import {ReactNode} from 'react'
import {
  ComposedGesture,
  GestureDetector as GestureDetectorBase,
  GestureType,
} from 'react-native-gesture-handler'

type Props = {
  children: ReactNode
  gesture: ComposedGesture | GestureType
}

export const GestureDetector = (props: Props) => (
  <GestureDetectorBase {...props} />
)
