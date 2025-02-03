import {type ReactNode} from 'react'
import {Phrase, type PhraseProps} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'

type Props = {
  children: ReactNode
  emphasis?: PhraseProps['emphasis']
  inverse?: boolean
  onPress: () => void
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  PhraseProps &
  LogProps

export const InlineLink = ({
  children,
  emphasis,
  inverse,
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
      color={inverse ? 'inverse' : 'link'}
      emphasis={emphasis}
      onPressOut={onEvent}
      underline
      variant={phraseVariant}
      {...otherProps}>
      {children}
    </Phrase>
  )
}
