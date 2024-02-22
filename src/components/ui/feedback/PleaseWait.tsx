import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Icon} from '@/components/ui/media/Icon'
import {TestProps} from '@/components/ui/types'

type Props = {
  grow?: boolean
} & TestProps

export const PleaseWait = ({grow, testID}: Props) => (
  <Center grow={grow}>
    <Box>
      <Icon
        color="link"
        name="spinner"
        size="lg"
        testID={testID}
      />
    </Box>
  </Center>
)
