import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import React, {ReactNode, useState} from 'react'
import {Swipeable} from 'react-native-gesture-handler'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {useTheme} from '@/themes'

type Props = {
  children: ReactNode
  onEvent: () => void
}

type DeleteButtonProps = {
  accessible: boolean
  onPress: () => void
}

const DeleteButton = ({accessible, onPress}: DeleteButtonProps) => {
  const {color} = useTheme()

  return (
    <Pressable
      accessible={accessible}
      inset="md"
      onPress={onPress}
      variant="negative">
      <Row align="end" valign="center" gutter="sm">
        <Phrase color="inverse" variant="small">
          Verwijder
        </Phrase>
        <Icon size={24}>
          <TrashBin fill={color.text.inverse} />
        </Icon>
      </Row>
    </Pressable>
  )
}

export const SwipeToDelete = ({children, onEvent}: Props) => {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false)

  const onSwipeableRightOpen = () => {
    setIsSwipeOpen(true)
    isSwipeOpen && onEvent()
  }

  return (
    <Swipeable
      renderRightActions={() => (
        <DeleteButton accessible={isSwipeOpen} onPress={onEvent} />
      )}
      onSwipeableRightOpen={onSwipeableRightOpen}>
      {children}
    </Swipeable>
  )
}
