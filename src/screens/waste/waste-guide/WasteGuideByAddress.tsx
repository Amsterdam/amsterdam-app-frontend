import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {ActivityIndicator, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {AddressFormTeaser} from '../../../components/features/address'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Link,
  Text,
  Title,
} from '../../../components/ui'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {AddressContext} from '../../../providers'
import {size} from '../../../tokens'
import {Address} from '../../../types'
import {
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
  WasteGuideCollectionPoints,
  WasteGuideContainers,
} from '../index'
import {WasteGuide, WasteGuideResponse, WasteType} from './types'
import {transformWasteGuideResponse} from './utils/transformWasteGuideResponse'

export const WasteGuideByAddress = () => {
  const [address, setAddress] = useState<Address | undefined>(undefined)
  const [isAddressRetrieving, setIsAddressRetrieving] = useState(true)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Waste'>>()

  const asyncStorage = useAsyncStorage()
  const addressContext = useContext(AddressContext)

  const retrieveAndSetAddress = useCallback(async () => {
    const retrievedAddress = await asyncStorage.getData('address')
    retrievedAddress && setAddress(retrievedAddress)
    setIsAddressRetrieving(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAndSetAddress()
  }, [retrieveAndSetAddress])

  useEffect(() => {
    setAddress(addressContext.address)
  }, [addressContext.address])

  const api = useFetch<WasteGuideResponse>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  useEffect(() => {
    api.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setWasteGuide(transformWasteGuideResponse(api.data, address))
  }, [address, api.data])

  const onChangeAddress = () => {
    addressContext.changeSaveInStore(false)
    navigation.navigate('AddressForm')
  }

  useEffect(() => {
    return () => {
      addressContext.changeSaveInStore(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    !isAddressRetrieving &&
      !address &&
      addressContext &&
      addressContext.changeSaveInStore(false)
  }, [isAddressRetrieving, address]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasWasteGuideDetails = wasteGuide && Object.keys(wasteGuide).length

  if (isAddressRetrieving) {
    return null
  }

  if (!isAddressRetrieving && !address) {
    return (
      <AddressFormTeaser
        text="Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval."
        title="Uw adres"
      />
    )
  }

  return address ? (
    <>
      <Box background="lighter">
        <View accessible={true}>
          <Text>Afvalinformatie voor</Text>
          <Gutter height={size.spacing.xs} />
          <Title text={address.adres} />
          <Gutter height={size.spacing.sm} />
        </View>
        <Link
          direction="backward"
          onPress={onChangeAddress}
          text="Verander adres"
        />
      </Box>
      <Box background="light">
        {api.isLoading ? (
          <Card>
            <CardHeader>
              <Title level={4} text="Gegevens ophalen…" />
            </CardHeader>
            <CardBody>
              <ActivityIndicator />
            </CardBody>
          </Card>
        ) : hasWasteGuideDetails ? (
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
          </>
        ) : (
          <WasteGuideByAddressNoDetails address={address} />
        )}
      </Box>
    </>
  ) : null
}
