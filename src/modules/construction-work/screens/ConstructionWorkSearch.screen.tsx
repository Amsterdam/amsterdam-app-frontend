import {Screen} from '@/components/ui/layout/Screen'
import {ProjectsByText} from '@/modules/construction-work/components/projects/ProjectsByText'

export const ConstructionWorkSearchScreen = () => (
  <Screen
    scroll={false}
    withBottomInset={false}>
    <ProjectsByText />
  </Screen>
)
