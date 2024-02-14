import {ReactNode, useCallback, useState} from 'react'
import {Swipeable} from 'react-native-gesture-handler'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {devError} from '@/processes/development'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {LogProps, PiwikAction} from '@/processes/piwik/types'
import {getLogNameFromProps} from '@/processes/piwik/utils/getLogNameFromProps'

type Props = {
  children: ReactNode
  onEvent: () => void
  showIcon?: boolean
} & Partial<Omit<LogProps, 'logAction'>> &
  TestProps

type DeleteButtonProps = {
  onPress: () => void
  showIcon: boolean
} & Partial<LogProps> &
  TestProps

const DeleteButton = ({onPress, showIcon, ...props}: DeleteButtonProps) => (
  <Pressable
    accessibilityElementsHidden
    inset="md"
    onPress={onPress}
    variant="negative"
    {...props}>
    <Column
      align="center"
      grow>
      <Row
        align="end"
        gutter="sm"
        valign="center">
        <Phrase
          color="inverse"
          variant="small">
          Verwijder
        </Phrase>
        {!!showIcon && (
          <Icon
            color="inverse"
            name="trash-bin"
            size="lg"
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
  logCategory,
  logDimensions,
  logValue,
  ...props
}: Props) => {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false)
  const {trackCustomEvent} = usePiwik()

  const onSwipeableOpen = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'right') {
        setIsSwipeOpen(true)

        if (isSwipeOpen) {
          onEvent()
          const logName = getLogNameFromProps(props)

          if (logName) {
            trackCustomEvent(
              logName,
              PiwikAction.swipeOut,
              logDimensions,
              logCategory,
              logValue,
            )
          } else {
            devError('No name found for component')
          }
        }
      }
    },
    [
      isSwipeOpen,
      logCategory,
      logDimensions,
      logValue,
      onEvent,
      props,
      trackCustomEvent,
    ],
  )

  return (
    <Swipeable
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={() => (
        <DeleteButton
          onPress={onEvent}
          showIcon={showIcon}
          {...props}
        />
      )}>
      {children}
    </Swipeable>
  )
}
