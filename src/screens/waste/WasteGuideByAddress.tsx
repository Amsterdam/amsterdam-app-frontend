import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {AddressForm} from '../../components/features/AddressForm'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Link,
  Text,
  Title,
} from '../../components/ui'
import {useAsyncStorage} from '../../hooks/useAsyncStorage'
import {useFetch} from '../../hooks/useFetch'
import {size} from '../../tokens'
import {Address} from '../../types/address'
import {WasteGuideForBulkyWaste, WasteGuideForHouseholdWaste} from './'

export type WasteGuide = {
  features: WasteGuideFeature[]
  type: string
}

export type WasteGuideFeature = {
  properties: {
    aanbiedwijze: string
    dataset: string
    frequentie: string
    mutatie: string
    ophaaldag: string
    ophalen: string
    opmerking: string
    stadsdeel_code: string
    stadsdeel_id: string
    stadsdeel_naam: string
    tijd_tot: string
    tijd_vanaf: string
    type: string
    website: string
  }
}

export const WasteGuideByAddress = () => {
  const [address, setAddress] = useState<Address | undefined>(undefined)
  const [isAddressRetrieving, setIsAddressRetrieving] = useState(true)
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )

  const asyncStorage = useAsyncStorage()

  const retrieveAddress = useCallback(async () => {
    const retrievedAddress = await asyncStorage.getData('address')
    setAddress(retrievedAddress)
    setIsAddressRetrieving(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
  }, [retrieveAddress])

  const api = useFetch<WasteGuide>({
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
    setWasteGuide(api.data ?? undefined)
  }, [api.data])

  // TODO Transform to minimal format, combining into one object
  const bulkyWaste = wasteGuide?.features?.length
    ? wasteGuide.features.find(f => f.properties.dataset === 'grofvuil')
        ?.properties
    : null

  const householdWaste = wasteGuide?.features?.length
    ? wasteGuide.features.find(f => f.properties.dataset === 'huisvuil')
        ?.properties
    : null

  if (isAddressRetrieving) {
    return null
  }

  if (address) {
    return (
      <>
        <Box background="lighter">
          <Text>Afvalinformatie voor</Text>
          <Title text={address.adres} />
          <Link
            direction="backward"
            onPress={() => setAddress(undefined)}
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
          ) : (
            <>
              {bulkyWaste && (
                <WasteGuideForBulkyWaste properties={bulkyWaste} />
              )}
              {householdWaste && (
                <>
                  {bulkyWaste && <Gutter height={size.spacing.md} />}
                  <WasteGuideForHouseholdWaste properties={householdWaste} />
                </>
              )}
            </>
          )}
        </Box>
      </>
    )
  }

  return (
    <Box background="lighter">
      <Title level={2} text="Uw adres" />
      <Text>
        Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval.
      </Text>
      <Gutter height={size.spacing.md} />
      <AddressForm onSubmit={setAddress} />
    </Box>
  )
}
