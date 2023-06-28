import {ReactNode} from 'react'
import {TextProps} from 'react-native'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  children: ReactNode
  onPress: () => void
} & TestProps &
  Omit<TextProps, 'style'>

export const InlineLink = ({children, ...otherProps}: Props) => (
  <Phrase
    accessibilityRole="link"
    color="link"
    emphasis="strong"
    {...otherProps}>
    {children}
  </Phrase>
)
