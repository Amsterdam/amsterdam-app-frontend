import {type ReactNode} from 'react'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase, type PhraseProps} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'

type Props = {
  children: ReactNode
  emphasis?: PhraseProps['emphasis']
  external?: boolean
  inverse?: boolean
  onPress: () => void
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  PhraseProps &
  LogProps

export const InlineLink = ({
  accessibilityRole = 'link',
  children,
  emphasis,
  inverse,
  onPress,
  phraseVariant,
  logAction = PiwikAction.buttonPress,
  external = false,
  testID,
  ...otherProps
}: Props) => {
  const onEvent = usePiwikTrackCustomEventFromProps({
    ...otherProps,
    testID,
    logAction,
    onEvent: onPress,
  })

  return (
    <Phrase
      accessibilityRole={accessibilityRole}
      color={inverse ? 'inverse' : 'link'}
      emphasis={emphasis}
      onPress={onEvent}
      testID={testID}
      underline={!external}
      variant={phraseVariant}
      {...otherProps}>
      {children}
      {external ? (
        <>
          {'  '}
          <Icon
            color="link"
            name="external-link"
            size="smd"
            testID={`${testID}Icon`}
          />
        </>
      ) : null}
    </Phrase>
  )
}
