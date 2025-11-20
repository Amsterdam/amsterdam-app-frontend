import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {KTOForm} from '@/modules/survey/components/KTOForm'

export const FeedbackScreen = () => (
  <Screen testID="AboutFeedbackScreen">
    <Box>
      <KTOForm unique_code="general" />
    </Box>
  </Screen>
)
