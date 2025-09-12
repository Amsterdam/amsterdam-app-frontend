import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {WasteGuideCalendar} from '@/modules/waste-guide/components/WasteGuideCalendar'

export const WasteGuideCalendarScreen = () => (
  <Screen
    scroll={false}
    testID="WasteGuideCalendarScreen">
    <Box>
      <WasteGuideCalendar />
    </Box>
  </Screen>
)
