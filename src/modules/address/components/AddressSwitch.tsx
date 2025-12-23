import {useEffect, useMemo, useState} from 'react'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {AlertTopOfScreen} from '@/components/ui/feedback/alert/AlertTopOfScreen'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressSwitchSaveMyAddress} from '@/modules/address/components/AddressSwitchSaveMyAddress'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {AddressRouteName} from '@/modules/address/routes'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {
  getAddressSwitchIcon,
  getAddressSwitchLabel,
} from '@/modules/address/utils/getAddressSwitchProps'
import {ModuleSlug} from '@/modules/slugs'
import {ReduxKey} from '@/store/types/reduxKey'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type AddressSwitcherProps = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  noAddressText?: string
  reduxKey?: ReduxKey
} & TestProps

export const AddressSwitch = ({
  testID,
  noAddressText,
  reduxKey = ReduxKey.address,
  highAccuracyPurposeKey = HighAccuracyPurposeKey.PreciseLocationAddressLookup,
}: AddressSwitcherProps) => {
  const {navigate} = useNavigation()

  const {address, myAddress, locationType, isFetchingLocation} =
    useModuleBasedSelectedAddress(reduxKey)

  const [showMyAddressHint, setShowMyAddressHint] = useState(false)

  useEffect(() => {
    if (!myAddress && !!address && locationType === 'address') {
      setShowMyAddressHint(true)
    }
  }, [address, myAddress, locationType])

  const iconName = useMemo(
    () =>
      getAddressSwitchIcon(
        locationType,
        address,
        myAddress,
        isFetchingLocation,
      ),
    [address, isFetchingLocation, myAddress, locationType],
  )

  const label = useMemo(
    () => getAddressSwitchLabel(locationType, address, isFetchingLocation),
    [address, isFetchingLocation, locationType],
  )

  const onNavigateToAddressForm = () =>
    navigate(ModuleSlug.address, {
      screen: AddressRouteName.chooseAddress,
      params: {highAccuracyPurposeKey, reduxKey},
    })

  return (
    <>
      <Column gutter="xl">
        <NavigationButton
          accessibilityLabel={accessibleText(label)}
          accessibilityLanguage="nl-NL"
          accessibilityRole="button"
          emphasis="default"
          iconName={iconName}
          iconSize="md"
          onPress={onNavigateToAddressForm}
          testID={testID}
          title={label}
        />

        {!address && !!noAddressText && (
          <Column gutter="md">
            <Title text="Geen adres" />
            <Paragraph>{noAddressText}</Paragraph>
            <Button
              label="Adres invullen"
              onPress={onNavigateToAddressForm}
              testID="AddressSwitchChooseAddressButton"
            />
          </Column>
        )}

        {!!showMyAddressHint && (
          <AddressSwitchSaveMyAddress
            onClose={() => setShowMyAddressHint(false)}
            reduxKey={reduxKey}
          />
        )}
      </Column>
      <AlertTopOfScreen inset="no" />
    </>
  )
}
