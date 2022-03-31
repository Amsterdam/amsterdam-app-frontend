import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {AddressFormTeaser} from '../../../components/features/address'
import {selectAddress} from '../../../components/features/address/addressSlice'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  SingleSelectable,
  Text,
  TextButton,
  Title,
} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {Address} from '../../../types'
import {isEmptyObject} from '../../../utils'
import {WasteGuide, WasteGuideResponse, WasteType} from './types'
import {
  transformWasteGuideResponse,
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
  WasteGuideCollectionPoints,
  WasteGuideContainers,
} from './'

export const WasteGuideByAddress = () => {
  const asyncStorage = useAsyncStorage()
  const [address, setAddress] = useState<Address | undefined>()
  const tempAddress = useSelector(selectAddress)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'WasteGuide'>>()

  const wasteGuideEndpoint = useFetch<WasteGuideResponse>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  const setTempOrStoredAddress = useCallback(async () => {
    if (!isEmptyObject(tempAddress)) {
      setAddress(tempAddress)
    } else {
      const addressFromStore = await asyncStorage.getValue<Address>('address')
      setAddress(addressFromStore)
    }
  }, [tempAddress]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTempOrStoredAddress()
  }, [setTempOrStoredAddress])

  useEffect(() => {
    wasteGuideEndpoint.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setWasteGuide(transformWasteGuideResponse(wasteGuideEndpoint.data, address))
  }, [address, wasteGuideEndpoint.data])

  const wasteGuideLength = wasteGuide && Object.keys(wasteGuide).length

  const navigateToAddressForm = () => {
    navigation.navigate(routes.addressForm.name, {temp: true})
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
    <>
      <Box background="white">
        <SingleSelectable>
          <Text>Afvalinformatie voor</Text>
          <Gutter height="xs" />
          <Title text={address.adres} />
          <Gutter height="sm" />
        </SingleSelectable>
        <Row align="start">
          <TextButton
            direction="backward"
            emphasis
            onPress={navigateToAddressForm}
            text="Verander adres"
          />
        </Row>
      </Box>
      <Box>
        {wasteGuideLength === undefined ? (
          <Card>
            <CardHeader>
              <Title level={4} text="Gegevens ophalen…" />
            </CardHeader>
            <CardBody>
              <ActivityIndicator />
            </CardBody>
          </Card>
        ) : wasteGuideLength === 0 ? (
          <WasteGuideByAddressNoDetails address={address} />
        ) : (
          <>
            {wasteGuide?.[WasteType.Bulky] && (
              <>
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Bulky]!}
                  footerLink={{
                    onPress: () =>
                      navigation.navigate(routes.whereToPutBulkyWaste.name),
                    text: 'Grof afval: buiten zetten of naar een afvalpunt?',
                  }}
                />
                <Gutter height="md" />
                <WasteGuideCollectionPoints />
              </>
            )}
            {wasteGuide?.[WasteType.Household] && (
              <>
                {wasteGuide[WasteType.Bulky] && <Gutter height="md" />}
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Household]!}
                />
                <Gutter height="md" />
                <WasteGuideContainers />
              </>
            )}
            <Gutter height="md" />
            <TextButton
              direction="forward"
              onPress={() =>
                navigation.navigate(routes.webView.name, {
                  sliceFromTop: {portrait: 161, landscape: 207},
                  title: 'Melden afvalinformatie',
                  url: 'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/',
                })
              }
              text="Kloppen de dagen of tijden niet?"
            />
          </>
        )}
      </Box>
    </>
  )
}
