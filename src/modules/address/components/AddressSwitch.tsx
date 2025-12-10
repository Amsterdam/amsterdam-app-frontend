import {useMemo} from 'react'
import type {TestProps} from '@/components/ui/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {AddressRouteName} from '@/modules/address/routes'
import {
  getAddressSwitchIcon,
  getAddressSwitchLabel,
} from '@/modules/address/utils/getAddressSwitchProps'
import {ModuleSlug} from '@/modules/slugs'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type AddressSwitcherProps = TestProps

export const AddressSwitch = ({testID}: AddressSwitcherProps) => {
  const {navigate} = useNavigation()
  const {address, locationType, isFetching} = useSelectedAddress()

  const iconName = useMemo(
    () => getAddressSwitchIcon(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  const label = useMemo(
    () => getAddressSwitchLabel(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  return (
    <NavigationButton
      accessibilityLabel={accessibleText(label)}
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      emphasis="default"
      iconName={iconName}
      iconSize="md"
      onPress={() =>
        navigate(ModuleSlug.address, {screen: AddressRouteName.address})
      }
      testID={testID}
      title={label}
    />
  )
}
