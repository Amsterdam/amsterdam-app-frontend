import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {AddressFormTeaser} from '../../../components/features/address'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  TextButton,
  Title,
} from '../../../components/ui'
import {SingleSelectable} from '../../../components/ui/SingleSelectable'
import {Gutter, Row} from '../../../components/ui/layout'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {AddressContext} from '../../../providers'
import {size} from '../../../tokens'
import {Address} from '../../../types'
import {WasteGuide, WasteGuideResponse, WasteType} from './types'
import {
  transformWasteGuideResponse,
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
  WasteGuideCollectionPoints,
  WasteGuideContainers,
} from './'

export const WasteGuideByAddress = () => {
  const [address, setAddress] = useState<Address | undefined>(undefined)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )
  const addressContext = useContext(AddressContext)
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Waste'>>()

  const wasteGuideEndpoint = useFetch<WasteGuideResponse>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  const retrieveAddress = useCallback(async () => {
    const retrievedAddress = await asyncStorage.getData('address')
    retrievedAddress && setAddress(retrievedAddress)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
  }, [retrieveAddress])

  useEffect(() => {
    setAddress(addressContext.address)
  }, [addressContext.address])

  useEffect(() => {
    wasteGuideEndpoint.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setWasteGuide(transformWasteGuideResponse(wasteGuideEndpoint.data, address))
  }, [address, wasteGuideEndpoint.data])

  useEffect(() => {
    return () => {
      addressContext.changeSaveInStore(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    !address && addressContext && addressContext.changeSaveInStore(false)
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  const wasteGuideLength = wasteGuide && Object.keys(wasteGuide).length

  const navigateToAddressForm = () => {
    addressContext.changeSaveInStore(false)
    navigation.navigate('AddressForm')
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
          <Gutter height={size.spacing.xs} />
          <Title text={address.adres} />
          <Gutter height={size.spacing.sm} />
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
        {!wasteGuideLength ? (
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
                <Gutter height={size.spacing.md} />
                <WasteGuideCollectionPoints />
              </>
            )}
            {wasteGuide?.[WasteType.Household] && (
              <>
                {wasteGuide[WasteType.Bulky] && (
                  <Gutter height={size.spacing.md} />
                )}
                <WasteGuideByAddressDetails
                  details={wasteGuide[WasteType.Household]!}
                />
                <Gutter height={size.spacing.md} />
                <WasteGuideContainers />
              </>
            )}
            <Gutter height={size.spacing.md} />
            <TextButton
              direction="forward"
              onPress={() =>
                navigation.navigate(routes.webView.name, {
                  sliceFromTop: {portrait: 161, landscape: 207},
                  title: 'Melding afvalinformatie',
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
