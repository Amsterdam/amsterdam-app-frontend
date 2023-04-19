import {ReactNode} from 'react'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  children: ReactNode
  onPress: () => void
}

export const InlineLink = ({children, onPress}: Props) => (
  <Phrase color="link" onPress={onPress} underline>
    {children}
  </Phrase>
)
