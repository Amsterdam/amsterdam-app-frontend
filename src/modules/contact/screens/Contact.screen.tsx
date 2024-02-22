import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Screen} from '@/components/ui/layout/Screen'
import {CityOffice} from '@/modules/contact/components/city-offices/CityOffice'
import {SelectCityOffice} from '@/modules/contact/components/city-offices/SelectCityOffice'
import {ContactOptions} from '@/modules/contact/components/contact-options/ContactOptions'

export const ContactScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet testID="ContactSelectCityOfficeBottomSheet">
        <SelectCityOffice />
      </BottomSheet>
    }
    testID="ContactScreen">
    <ContactOptions />
    <CityOffice />
  </Screen>
)
