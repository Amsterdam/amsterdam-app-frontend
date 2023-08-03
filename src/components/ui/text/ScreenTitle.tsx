import {Title} from '@/components/ui/text/Title'

type Props = {
  accessibilityLanguage?: string
  text: string
}

export const ScreenTitle = ({accessibilityLanguage, text}: Props) => (
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
