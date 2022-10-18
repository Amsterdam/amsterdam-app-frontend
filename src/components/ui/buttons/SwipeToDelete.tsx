import React, {ReactNode, useState} from 'react'
import {Swipeable} from 'react-native-gesture-handler'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'

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
    <Row align="end" gutter="sm" valign="center">
      <Phrase color="inverse" variant="small">
        Verwijder
      </Phrase>
      <Icon color="inverse" name="trash-bin" size={24} />
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
      renderRightActions={() => <DeleteButton onPress={onEvent} />}
      onSwipeableRightOpen={onSwipeableRightOpen}>
      {children}
    </Swipeable>
  )
}
