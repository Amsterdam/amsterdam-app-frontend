import {ReactNode, useCallback, useState} from 'react'
import {Swipeable} from 'react-native-gesture-handler'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  children: ReactNode
  onEvent: () => void
  showIcon?: boolean
}

type DeleteButtonProps = {
  onPress: () => void
  showIcon: boolean
}

const DeleteButton = ({onPress, showIcon}: DeleteButtonProps) => (
  <Pressable
    accessibilityElementsHidden
    inset="md"
    onPress={onPress}
    variant="negative">
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

export const SwipeToDelete = ({showIcon = true, children, onEvent}: Props) => {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false)

  const onSwipeableOpen = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'right') {
        setIsSwipeOpen(true)
        isSwipeOpen && onEvent()
      }
    },
    [isSwipeOpen, onEvent],
  )

  return (
    <Swipeable
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={() => (
        <DeleteButton
          onPress={onEvent}
          showIcon={showIcon}
        />
      )}>
      {children}
    </Swipeable>
  )
}
