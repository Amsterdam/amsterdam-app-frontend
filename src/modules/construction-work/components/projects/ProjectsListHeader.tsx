import {Box} from '@/components/ui/containers'
import {Column, Gutter} from '@/components/ui/layout'

type Props = {
  children: React.ReactNode
}

export const ProjectsListHeader = ({children}: Props) => (
  <Box insetHorizontal="md">
    <Column gutter="md">{children}</Column>
    <Gutter height="lg" />
  </Box>
)
