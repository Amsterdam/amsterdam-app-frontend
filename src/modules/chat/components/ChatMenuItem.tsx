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

export const ChatMenuItem = ({onPress, testID, label, color}: Props) => (
  <Size width={'100%'}>
    <Pressable
      onPress={onPress}
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
)
