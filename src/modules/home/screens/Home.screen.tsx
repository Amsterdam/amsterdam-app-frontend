import {Screen} from '@/components/features/screen/Screen'
import {Home} from '@/modules/home/components/Home'
import {BottomSheetSurvey} from '@/modules/survey/exports/BottomSheetSurvey'

export const HomeScreen = () => (
  <Screen
    bottomSheet={<BottomSheetSurvey testID="HomeBottomSheet" />}
    hasStickyAlert
    headerOptions={{
      disableHorizontalInsets: true,
    }}
    testID="HomeScreen">
    <Home />
  </Screen>
)
