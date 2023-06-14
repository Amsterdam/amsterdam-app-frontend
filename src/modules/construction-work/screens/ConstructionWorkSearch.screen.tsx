import {Screen} from '@/components/ui/layout'
import {ProjectsByText} from '@/modules/construction-work/components/projects'

export const ConstructionWorkSearchScreen = () => (
  <Screen
    scroll={false}
    withBottomInset={false}>
    <ProjectsByText />
  </Screen>
)
