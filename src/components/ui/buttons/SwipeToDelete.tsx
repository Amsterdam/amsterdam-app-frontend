import {ReactNode, useState} from 'react'
import {Swipeable} from 'react-native-gesture-handler'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  children: ReactNode
  onEvent: () => void
}

type DeleteButtonProps = {
  onPress: () => void
}

const DeleteButton = ({onPress}: DeleteButtonProps) => (
  <Pressable
    accessibilityElementsHidden
    inset="md"
    onPress={onPress}
    variant="negative">
    <Row
      align="end"
      gutter="sm"
      valign="center">
      <Phrase
        color="inverse"
        variant="small">
        Verwijder
      </Phrase>
      <Icon
        color="inverse"
        name="trash-bin"
        size="lg"
      />
    </Row>
  </Pressable>
)

export const SwipeToDelete = ({children, onEvent}: Props) => {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false)

  const onSwipeableRightOpen = () => {
    setIsSwipeOpen(true)
    isSwipeOpen && onEvent()
  }

  return (
    <Swipeable
      onSwipeableRightOpen={onSwipeableRightOpen}
      renderRightActions={() => <DeleteButton onPress={onEvent} />}>
      {children}
    </Swipeable>
  )
}
