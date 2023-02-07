import {Title} from '@/components/ui/text'

type Props = {
  text: string
  accessibilityLanguage?: string
}

export const ScreenTitle = ({text, accessibilityLanguage}: Props) => (
  <Title
    accessibilityLanguage={accessibilityLanguage}
    allowFontScaling={false}
    ellipsizeMode="middle"
    level="h5"
    numberOfLines={1}
    testID="HeaderTitle"
    text={text}
  />
)
