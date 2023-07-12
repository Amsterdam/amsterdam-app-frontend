import {PressableProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {TestProps} from '@/components/ui/types'

type Props = {
  label: string
} & PressableProps &
  TestProps

export const SuggestionButton = ({label, onPress, testID}: Props) => (
  <Pressable
    accessibilityRole="button"
    insetVertical="md"
    onPress={onPress}
    testID={testID}>
    <Row gutter="sm">
      <Icon
        color="link"
        name="location"
        size="lg"
        testID={testID ? `${testID}Icon` : undefined}
      />
      <Phrase
        color="link"
        ellipsizeMode="tail"
        numberOfLines={1}
        testID={testID ? `${testID}Label` : undefined}>
        {label}
      </Phrase>
    </Row>
  </Pressable>
)
