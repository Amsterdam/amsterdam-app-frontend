import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

export const ConfirmAccessCodeScreen = () => (
  <Screen testID="ConfirmAccessCodeScreen">
    <Box>
      <Title
        level="h2"
        testID="ConfirmAccessCodeScreenTitle"
        text="Herhaal uw toegangscode"
      />
    </Box>
  </Screen>
)
