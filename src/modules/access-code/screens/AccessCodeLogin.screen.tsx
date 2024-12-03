import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

export const AccessCodeLoginScreen = () => (
  <Screen testID="AccessCodeLoginScreen">
    <Box>
      <Title
        level="h2"
        testID="AccessCodeLoginScreenTitle"
        text="Inloggen & beveiligen"
      />
    </Box>
  </Screen>
)
