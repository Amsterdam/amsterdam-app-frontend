import {Box} from '@/components/ui/containers/Box'
import {Warning} from '@/components/ui/feedback/Warning'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'

export const SomethingWentWrong = () => {
  const text = 'Er ging iets mis.'
  const title = 'Sorry …'

  useAccessibilityAnnounceEffect(`${title} ${text}`)

  return (
    <Box>
      <Warning
        text={text}
        title={title}
      />
    </Box>
  )
}
