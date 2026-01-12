import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'

type Props = {
  children: React.ReactNode
}

export const ProjectsListHeader = ({children}: Props) => (
  <Box
    insetBottom="lg"
    insetHorizontal="md">
    <Column gutter="md">{children}</Column>
    <Gutter height="lg" />
  </Box>
)
