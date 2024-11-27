import {forwardRef} from 'react'
import {View} from 'react-native-reanimated/lib/typescript/Animated'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {type Theme} from '@/themes/themes'

type Props = {
  color?: keyof Theme['color']['text']
  label: string
  onPress: () => void
} & TestProps

export const ChatMenuItem = forwardRef<View, Props>(
  ({onPress, testID, label, color}, ref) => (
    <Size width={'100%'}>
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
    </Size>
  ),
)
