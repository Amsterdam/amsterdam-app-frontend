import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Icon} from '@/components/ui/media/Icon'

type Props = {
  grow?: boolean
}

export const PleaseWait = ({grow}: Props) => (
  <Center grow={grow}>
    <Box>
      <Icon
        color="link"
        name="spinner"
        size="lg"
      />
    </Box>
  </Center>
)
