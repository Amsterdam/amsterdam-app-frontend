import {Box} from '@/components/ui/containers'
import {Warning} from '@/components/ui/feedback'

export const SomethingWentWrong = () => (
  <Box>
    <Warning text="Er ging iets mis." title="Sorry …" />
  </Box>
)
