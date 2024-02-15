import {type ReactNode} from 'react'
import {type TextProps} from 'react-native'
import {Phrase, type PhraseProps} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'

type Props = {
  children: ReactNode
  onPress: () => void
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  Omit<TextProps, 'style'> &
  LogProps

export const InlineLink = ({
  children,
  onPress,
  phraseVariant,
  logAction = PiwikAction.buttonPress,
  ...otherProps
}: Props) => {
  const onEvent = usePiwikTrackCustomEventFromProps({
    ...otherProps,
    logAction,
    onEvent: onPress,
  })

  return (
    <Phrase
      accessibilityRole="link"
      color="link"
      onPress={onEvent}
      underline
      variant={phraseVariant}
      {...otherProps}>
      {children}
    </Phrase>
  )
}
