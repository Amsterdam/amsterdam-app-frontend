import {View} from 'react-native'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  isAccessible?: boolean
  text: string
}

export const Label = ({isAccessible, text}: Props) => (
  <View
    accessibilityElementsHidden={!isAccessible} // in case of iOS
    accessibilityLanguage="nl-NL"
    importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
  >
    <Phrase
      emphasis="strong"
      testID="TextInputLabel">
      {text}
    </Phrase>
  </View>
)
