import {useLayoutEffect} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Warning} from '@/components/ui/feedback/Warning'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

export const SomethingWentWrong = () => {
  const text = 'Er ging iets mis.'
  const title = 'Sorry …'
  const a11yAnnounce = useAccessibilityAnnounce()

  useLayoutEffect(() => {
    a11yAnnounce(title + text)
  }, [a11yAnnounce])

  return (
    <Box>
      <Warning
        text={text}
        title={title}
      />
    </Box>
  )
}
