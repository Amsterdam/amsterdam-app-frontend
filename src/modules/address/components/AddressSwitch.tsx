import {useCallback, useEffect, useMemo, useState} from 'react'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {AlertTopOfScreen} from '@/components/ui/feedback/alert/AlertTopOfScreen'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/address/alerts'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {AddressRouteName} from '@/modules/address/routes'
import {addAddress} from '@/modules/address/slice'
import {HighAccuracyPurposeKey, type Address} from '@/modules/address/types'
import {
  getAddressSwitchIcon,
  getAddressSwitchLabel,
} from '@/modules/address/utils/getAddressSwitchProps'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type AddressSwitcherProps = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  noAddressText?: string
} & TestProps

export const AddressSwitch = ({
  testID,
  noAddressText,
  highAccuracyPurposeKey = HighAccuracyPurposeKey.PreciseLocationAddressLookup,
}: AddressSwitcherProps) => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const {address, locationType, isFetching} = useSelectedAddress()
  const [showMyAddressCTA, setShowMyAddressCTA] = useState(false)
  const [myAddress, setMyAddress] = useState<Address | undefined>(undefined)
  const {setAlert} = useAlert()

  useEffect(() => {
    setShowMyAddressCTA(!!address && !myAddress)
  }, [address, myAddress])

  const iconName = useMemo(
    () => getAddressSwitchIcon(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  const label = useMemo(
    () => getAddressSwitchLabel(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  const onNavigateToAddressForm = () =>
    navigate(ModuleSlug.address, {
      screen: AddressRouteName.chooseAddress,
      params: {highAccuracyPurposeKey},
    })

  const onDeclineMyAddress = () => {
    setShowMyAddressCTA(false)
  }

  const onSaveMyAddress = useCallback(() => {
    if (!address) {
      return
    }

    dispatch(addAddress(address))
    setMyAddress(address)
    setAlert(alerts.saveMyAddressSuccess)
  }, [address, dispatch, setAlert])

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

        {!!showMyAddressCTA && (
          <Column gutter="md">
            <Title
              level="h3"
              text="Wilt u dit adres opslaan als Mijn adres?"
            />
            <Paragraph>
              Met Mijn adres ziet u in de hele app alle informatie die bij dit
              adres hoort. U kunt ook meldingen uit deze buurt krijgen. Dit
              stelt u in bij Mijn profiel.
            </Paragraph>
            <Box
              insetBottom="xl"
              insetTop="smd">
              <Row gutter="smd">
                <Button
                  flex={1}
                  label="Opslaan"
                  onPress={onSaveMyAddress}
                  testID="AddressSwitchSaveMyAddressButton"
                />
                <Button
                  flex={1}
                  label="Nee, later"
                  onPress={onDeclineMyAddress}
                  testID="AddressSwitchDeclineMyAddressButton"
                  variant="secondary"
                />
              </Row>
            </Box>
          </Column>
        )}
      </Column>
      <AlertTopOfScreen inset="no" />
    </>
  )
}
