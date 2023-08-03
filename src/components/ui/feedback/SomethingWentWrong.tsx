import {Box} from '@/components/ui/containers/Box'
import {Warning} from '@/components/ui/feedback/Warning'

export const SomethingWentWrong = () => (
  <Box>
    <Warning
      text="Er ging iets mis."
      title="Sorry …"
    />
  </Box>
)
