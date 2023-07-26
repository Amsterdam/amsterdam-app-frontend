import {ReactNode} from 'react'
import {TextProps} from 'react-native'
import {Phrase, PhraseProps} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  children: ReactNode
  onPress: () => void
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  Omit<TextProps, 'style'>

export const InlineLink = ({children, phraseVariant, ...otherProps}: Props) => (
  <Phrase
    accessibilityRole="link"
    color="link"
    underline
    variant={phraseVariant}
    {...otherProps}>
    {children}
  </Phrase>
)
