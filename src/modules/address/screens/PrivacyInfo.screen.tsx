import {CloseModalButton} from '@/components/ui/buttons/CloseModalButton'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Screen} from '@/components/ui/layout/Screen'
import {PrivacyInfo} from '@/modules/address/components/PrivacyInfo'

export const PrivacyInfoScreen = () => (
  <Screen
    stickyFooter={
      <CloseModalButton
        label="Oké, ik begrijp het!"
        testID="AddressPrivacyInfoModalCloseButton"
      />
    }
    stickyHeader={
      <ModalHeader
        testID="AddressPrivacyInfoModalHeader"
        title="Mijn profiel"
      />
    }
    testID="AddressPrivacyInfoScreen">
    <PrivacyInfo />
  </Screen>
)
