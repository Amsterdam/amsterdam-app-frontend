import {Screen} from '@/components/features/screen/Screen'
import {WasteGuideCalendar} from '@/modules/waste-guide/components/calendar/WasteGuideCalendar'

export const WasteGuideCalendarScreen = () => (
  <Screen
    scroll={false}
    testID="WasteGuideCalendarScreen">
    <WasteGuideCalendar />
  </Screen>
)
