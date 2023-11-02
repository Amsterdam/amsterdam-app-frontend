import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'
import {Screen} from '@/components/ui/layout/Screen'
import {CityOffice} from '@/modules/contact/components/city-offices/CityOffice'
import {SelectCityOffice} from '@/modules/contact/components/city-offices/SelectCityOffice'
import {ContactOptions} from '@/modules/contact/components/contact-options/ContactOptions'

export const ContactScreen = () => (
  <Screen
    stickyFooter={
      <BottomSheet>
        <SelectCityOffice />
      </BottomSheet>
    }
    testID="ContactScreen">
    <HideFromAccessibility whileBottomSheetIsOpen>
      <ContactOptions />
      <CityOffice />
    </HideFromAccessibility>
  </Screen>
)
