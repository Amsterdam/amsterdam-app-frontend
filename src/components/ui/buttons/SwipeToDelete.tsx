import {type ReactNode, useCallback, useState} from 'react'
import {Swipeable} from 'react-native-gesture-handler'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'

type Props = {
  children: ReactNode
  onEvent: () => void
  showIcon?: boolean
} & Omit<LogProps, 'logAction'> &
  TestProps

type DeleteButtonProps = {
  onPress: () => void
  showIcon: boolean
} & LogProps &
  TestProps

const DeleteButton = ({
  onPress,
  showIcon,
  testID,
  ...props
}: DeleteButtonProps) => (
  <Pressable
    accessibilityElementsHidden
    inset="md"
    onPress={onPress}
    testID={testID}
    variant="transparent"
    {...props}>
    <Column
      align="center"
      grow={1}>
      <Row
        align="end"
        gutter="sm">
        <Phrase
          color="inverse"
          testID={`${testID}Phrase`}
          variant="small">
          Verwijder
        </Phrase>
        {!!showIcon && (
          <Icon
            color="inverse"
            name="trash-bin"
            size="lg"
            testID={`${testID}Icon`}
          />
        )}
      </Row>
    </Column>
  </Pressable>
)

export const SwipeToDelete = ({
  showIcon = true,
  children,
  onEvent,
  testID,
  ...props
}: Props) => {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false)
  const onEventWithLogging = usePiwikTrackCustomEventFromProps<unknown>({
    ...props,
    logAction: PiwikAction.swipeOut,
    onEvent,
  })

  const onSwipeableOpen = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'right') {
        setIsSwipeOpen(true)

        if (isSwipeOpen) {
          onEventWithLogging(undefined)
        }
      }
    },
    [isSwipeOpen, onEventWithLogging],
  )

  return (
    <Swipeable
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={() => (
        <DeleteButton
          onPress={onEvent}
          showIcon={showIcon}
          testID={`${testID}Button`}
          {...props}
        />
      )}>
      {children}
    </Swipeable>
  )
}
