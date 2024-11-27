import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

export const SetAccessCodeScreen = () => (
  <Screen testID="SetAccessCodeScreen">
    <Box>
      <Title
        level="h2"
        testID="SetAccessCodeScreenTitle"
        text="Kies een toegangscode"
      />
    </Box>
  </Screen>
)
