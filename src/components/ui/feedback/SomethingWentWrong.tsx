import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'

type SomethingWentWrongProps = {
  text?: string
  title?: string
}

export const SomethingWentWrong = ({
  text = 'Er ging iets mis.',
  title = 'Sorry …',
}: SomethingWentWrongProps) => {
  useAccessibilityAnnounceEffect(`${title} ${text}`)

  return (
    <AlertNegative
      inset="md"
      testID="SomethingWentWrong"
      text={text}
      title={title}
    />
  )
}
