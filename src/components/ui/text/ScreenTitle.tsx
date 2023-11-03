import {Title} from '@/components/ui/text/Title'

type Props = {
  accessibilityLanguage?: string
  text: string
}

export const ScreenTitle = ({accessibilityLanguage = 'nl-NL', text}: Props) => (
  <Title
    accessibilityLanguage={accessibilityLanguage}
    level="h5"
    testID="HeaderTitle"
    text={text}
  />
)
