import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {Projects} from '@/modules/construction-work/components/projects/Projects'

export const ProjectsByDate = () => (
  <Projects
    HeaderButton={<ShareLocationTopTaskButton testID="ConstructionWork" />}
  />
)
