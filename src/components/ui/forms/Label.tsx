import {View} from 'react-native'
import {Paragraph} from '@/components/ui/text/Paragraph'

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
    <Paragraph>{text}</Paragraph>
  </View>
)
