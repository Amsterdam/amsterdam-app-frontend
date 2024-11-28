import {Title} from '@/components/ui/text/Title'

type Props = {
  accessibilityLanguage?: string
  text: string
}

export const ScreenHeaderTitle = ({
  accessibilityLanguage = 'nl-NL',
  text,
}: Props) => (
  <Title
    accessibilityLanguage={accessibilityLanguage}
    level="h5"
    numberOfLines={1}
    testID="HeaderTitle"
    text={text}
    textAlign="center"
  />
)
