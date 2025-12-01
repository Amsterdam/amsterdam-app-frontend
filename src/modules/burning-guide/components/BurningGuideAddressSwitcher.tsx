import {AddressSwitcher} from '@/components/features/address/AddressSwitcher'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuideAddressSwitcher = () => {
  const {navigate} = useNavigation()

  return (
    <AddressSwitcher
      accessibilityHint="Navigeer naar adres wijzigen scherm"
      onPress={() =>
        navigate(ModuleSlug.address, {screen: AddressRouteName.address})
      }
      testID="BurningGuideScreenTopTaskButton"
    />
  )
}
