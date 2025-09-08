import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {CityOffice} from '@/modules/contact/components/city-offices/CityOffice'
import {SelectCityOffice} from '@/modules/contact/components/city-offices/SelectCityOffice'

export const CityOfficeScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="ContactSelectCityOfficeBottomSheet">
        <SelectCityOffice />
      </BottomSheet>
    }
    testID="CityOfficeScreen"
    withLeftInset={false}
    withRightInset={false}>
    <HorizontalSafeArea>
      <CityOffice />
    </HorizontalSafeArea>
  </Screen>
)
