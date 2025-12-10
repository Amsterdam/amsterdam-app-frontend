import {Screen} from '@/components/features/screen/Screen'
import {Projects} from '@/modules/construction-work/components/projects/Projects'

export const ConstructionWorkScreen = () => (
  <Screen
    scroll={false}
    testID="ConstructionWorkScreen"
    withBottomInset={false}
    withLeftInset={false}
    withRightInset={false}>
    <Projects />
  </Screen>
)
