import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Title} from '@/components/ui/text/Title'

export const AccessCodeScreen = () => (
  <Screen
    scroll={false}
    stickyHeader={
      <ModalHeader
        testID="AccessCodeModalHeader"
        title="Toegangscode"
      />
    }
    testID="AccessCodeModalScreen">
    <Box>
      <Title
        testID="AccessCodeModalScreenTitle"
        text="Voer uw toegangscode in"
      />
    </Box>
  </Screen>
)
