import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import React, {ReactNode, useState} from 'react'
import {View, Pressable} from 'react-native'
import {Swipeable} from 'react-native-gesture-handler'
import {Box} from '@/components/ui'
import {Icon} from '@/components/ui/media'
import {useTheme} from '@/themes'

type Props = {
  children: ReactNode
  onEvent: () => void
}

export const SwipeToDelete = ({children, onEvent}: Props) => {
  const [swipeOpen, setSwipeOpen] = useState(false)
  const {color} = useTheme()

  return (
    <Swipeable
      renderRightActions={() => (
        <View>
          <Pressable onPress={onEvent}>
            <Box background="invalid" inset="md">
              <Icon size={24}>
                <TrashBin fill={color.text.inverse} />
              </Icon>
            </Box>
          </Pressable>
        </View>
      )}
      onSwipeableRightOpen={() => {
        setSwipeOpen(true)
        swipeOpen && onEvent()
      }}>
      {children}
    </Swipeable>
  )
}
