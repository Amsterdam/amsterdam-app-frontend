import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
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
    defaultHeader={{
      headerTitle: 'Contact',
      back: {},
    }}
    testID="ContactScreen">
    <ContactOptions />
    <CityOffice />
  </Screen>
)
