import {forwardRef} from 'react'
import {View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {Phrase} from '@/components/ui/text/Phrase'

export const PopUpMenuItem = forwardRef<View, PopupMenuItem>(
  ({onPress, testID, label, color}, ref) => (
    <Pressable
      onPress={onPress}
      ref={ref}
      testID={testID}>
      <Box
        insetHorizontal="md"
        insetVertical="sm">
        <Phrase
          color={color}
          testID={`${testID}Phrase`}>
          {label}
        </Phrase>
      </Box>
    </Pressable>
  ),
)
