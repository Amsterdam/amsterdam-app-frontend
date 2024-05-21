import {Screen} from '@/components/features/screen/Screen'
import {ProjectsByText} from '@/modules/construction-work/components/projects/ProjectsByText'

export const ConstructionWorkSearchScreen = () => (
  <Screen
    scroll={false}
    testID="ConstructionWorkSearchScreen"
    withBottomInset={false}>
    <ProjectsByText />
  </Screen>
)
