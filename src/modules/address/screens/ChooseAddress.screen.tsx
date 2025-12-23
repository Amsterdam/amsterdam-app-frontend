import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {AddressForm} from '@/modules/address/components/AddressForm'
import {AddressRouteName} from '@/modules/address/routes'

type Props = NavigationProps<AddressRouteName.chooseAddress>

export const ChooseAddressScreen = ({route}: Props) => {
  const {highAccuracyPurposeKey, reduxKey} = route.params ?? {}

  return (
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ChooseAddressScreen">
      <Box grow>
        <AddressForm
          highAccuracyPurposeKey={highAccuracyPurposeKey}
          reduxKey={reduxKey}
          showAddressButtons
        />
      </Box>
    </Screen>
  )
}
