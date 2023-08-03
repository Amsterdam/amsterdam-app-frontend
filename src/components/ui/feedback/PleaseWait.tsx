import {Spinner} from '@/components/ui/feedback/Spinner'
import {Center} from '@/components/ui/layout/Center'

type Props = {
  grow?: boolean
}

export const PleaseWait = ({grow}: Props) => (
  <Center grow={grow}>
    <Spinner />
  </Center>
)
