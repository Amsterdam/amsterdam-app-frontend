import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Box, SingleSelectable, Text, Title} from '@/components/ui'
import {TextButton} from '@/components/ui/buttons'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {useFetch} from '@/hooks'
import {selectAddress} from '@/modules/address/addressSlice'
import {AddressModalName} from '@/modules/address/routes'
import {module as wasteGuideModule} from '@/modules/waste-guide'
import {
  AddressFormTeaser,
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
  WasteGuideCollectionPoints,
  WasteGuideContainers,
} from '@/modules/waste-guide/components'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {
  WasteGuide,
  WasteGuideResponse,
  WasteType,
} from '@/modules/waste-guide/types'
import {transformWasteGuideResponse} from '@/modules/waste-guide/utils'
import {useEnvironment} from '@/store'

export const WasteGuideByAddress = () => {
  const {primary, temp} = useSelector(selectAddress)
  const address = temp ?? primary
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  const wasteGuideEndpoint = useFetch<WasteGuideResponse>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  useEffect(() => {
    // eslint-disable-next-line no-void
    void wasteGuideEndpoint.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  const environment = useEnvironment()
  useEffect(() => {
    setWasteGuide(
      transformWasteGuideResponse(
        wasteGuideEndpoint.data,
        address,
        environment,
      ),
    )
  }, [address, wasteGuideEndpoint.data, environment])

  const wasteGuideLength = wasteGuide && Object.keys(wasteGuide).length

  const navigateToAddressForm = () => {
    navigation.navigate(AddressModalName.addressForm, {
      addressIsTemporary: true,
    })
  }

  if (!address) {
    return (
      <AddressFormTeaser
        text="Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval."
        title="Uw adres"
      />
    )
  }

  return (
    <Column gutter="md">
      <Box>
        <Column gutter="sm">
          <SingleSelectable>
            <Text>Afvalinformatie voor</Text>
            <Title text={address.adres} />
          </SingleSelectable>
          <Row align="start">
            <TextButton
              direction="backward"
              emphasis
              label="Verander adres"
              onPress={navigateToAddressForm}
            />
          </Row>
        </Column>
      </Box>
      {wasteGuideLength === undefined ? (
        <Box>
          <Title level={4} text="Gegevens ophalen…" />
          <PleaseWait />
        </Box>
      ) : wasteGuideLength === 0 ? (
        <WasteGuideByAddressNoDetails address={address} />
      ) : (
        <>
          {wasteGuide?.[WasteType.Bulky] && (
            <Column gutter="md">
              <WasteGuideByAddressDetails
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                details={wasteGuide[WasteType.Bulky]!}
                footerLink={{
                  onPress: () =>
                    navigation.navigate(
                      WasteGuideRouteName.whereToPutBulkyWaste,
                    ),
                  text: 'Grof afval: buiten zetten of naar een afvalpunt?',
                }}
              />
              <WasteGuideCollectionPoints />
            </Column>
          )}
          {wasteGuide?.[WasteType.Household] && (
            <Column gutter="md">
              {wasteGuide[WasteType.Bulky] && <Gutter height="md" />}
              <WasteGuideByAddressDetails
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                details={wasteGuide[WasteType.Household]!}
              />
              <WasteGuideContainers />
            </Column>
          )}
          <Box>
            <TextButton
              direction="forward"
              label="Kloppen de dagen of tijden niet?"
              onPress={() =>
                navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
              }
            />
          </Box>
        </>
      )}
    </Column>
  )
}
