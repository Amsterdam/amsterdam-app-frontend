import {ReactNode} from 'react'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  children: ReactNode
  onPress: () => void
}

export const InlineLink = ({children, onPress}: Props) => (
  <Phrase
    accessibilityRole="link"
    color="link"
    emphasis="strong"
    onPress={onPress}>
    {children}
  </Phrase>
)
