import {View} from 'react-native'
import {Phrase} from '@/components/ui/text/Phrase'
import {Emphasis} from '@/themes/tokens/text'

type Props = {
  emphasis?: keyof typeof Emphasis
  isAccessible?: boolean
  text: string
}

export const Label = ({isAccessible, text, emphasis = 'strong'}: Props) => (
  <View
    accessibilityElementsHidden={!isAccessible} // in case of iOS
    accessibilityLanguage="nl-NL"
    importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
  >
    <Phrase
      emphasis={emphasis}
      testID="TextInputLabel">
      {text}
    </Phrase>
  </View>
)
