import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {module as wasteGuideModule} from '../'
import {RootStackParams} from '../../../app/navigation'
import {
  Box,
  PleaseWait,
  SingleSelectable,
  Text,
  Title,
} from '../../../components/ui'
import {Column, Gutter, Row} from '../../../components/ui/layout'
import {useFetch} from '../../../hooks'
import {useEnvironment} from '../../../store'
import {module as addressModule} from '../../address'
import {selectAddress} from '../../address/addressSlice'
import {AddressRouteName} from '../../address/routes'
import {WasteGuideRouteName} from '../routes'
import {WasteGuide, WasteGuideResponse, WasteType} from '../types'
import {transformWasteGuideResponse} from '../utils'
import {AddressFormTeaser} from './AddressFormTeaser'
import {
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
  WasteGuideCollectionPoints,
  WasteGuideContainers,
} from '.'
import {TextButton} from '@/components/ui/buttons'

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
    wasteGuideEndpoint.fetchData({
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
    navigation.navigate(addressModule.slug, {
      screen: AddressRouteName.addressForm,
      params: {
        addressIsTemporary: true,
      },
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
          <PleaseWait fullSize={false} />
        </Box>
      ) : wasteGuideLength === 0 ? (
        <WasteGuideByAddressNoDetails address={address} />
      ) : (
        <>
          {wasteGuide?.[WasteType.Bulky] && (
            <Column gutter="md">
              <WasteGuideByAddressDetails
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
