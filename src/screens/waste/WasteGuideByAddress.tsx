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
import {getEnvironment} from '../../environment'
import {useAsyncStorage} from '../../hooks/useAsyncStorage'
import {useFetch} from '../../hooks/useFetch'
import {size} from '../../tokens'
import {Address} from '../../types/address'
import {formatDateTimes, formatSentence} from '../../utils'
import {WasteGuideForBulkyWaste, WasteGuideForHouseholdWaste} from './'

export type WasteGuideResponse = {
  features: WasteGuideResponseFeature[]
  type: string
}

export type WasteGuideResponseFeature = {
  properties: WasteGuideResponseProperties
}

export type WasteGuideResponseProperties = {
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
  type: WasteGuideResponseType
  website: string
}

type WasteGuideResponseType = 'grofvuil' | 'huisvuil'

enum WasteType {
  Bulky,
  Household,
}

export type WasteGuide = {
  [WasteType.Bulky]?: WasteGuideDetails
  [WasteType.Household]?: WasteGuideDetails
}

export type WasteGuideDetails = {
  appointmentUrl: string | undefined
  collectionDays: string
  howToOffer: string
  remark: string
  whenToPutOut: string
}

const appointmentUrl = (
  address: Address | undefined,
  opmerking: string,
): string | undefined => {
  if (!address || !opmerking.startsWith('Maak een afspraak')) {
    return undefined
  }

  const {postcode, huisnummer, bag_huisletter, bag_toevoeging} = address

  return (
    getEnvironment().bulkyWasteFormUrl +
    '?GUID=' +
    [postcode, huisnummer, bag_huisletter, bag_toevoeging].join(',')
  )
}

const transformWasteGuideResponse = (
  wasteGuideResponse: WasteGuideResponse | undefined,
  address: Address | undefined,
): WasteGuide | undefined =>
  wasteGuideResponse?.features?.reduce<WasteGuide>((acc, feature) => {
    const {type, ophaaldag, aanbiedwijze, opmerking, tijd_tot, tijd_vanaf} =
      feature.properties

    acc[mapWasteType(type)] = {
      collectionDays: ophaaldag ? formatSentence(ophaaldag) : '',
      howToOffer: aanbiedwijze ? formatSentence(aanbiedwijze) : '',
      remark: opmerking ? formatSentence(opmerking) : '',
      appointmentUrl: opmerking && appointmentUrl(address, opmerking),
      whenToPutOut: ophaaldag
        ? formatSentence(
            formatDateTimes(
              ophaaldag,
              tijd_vanaf,
              'aanbiedtijden onbekend',
              'ophaaldagen onbekend',
              tijd_tot,
            ),
          )
        : '',
    }

    return acc
  }, {})

const mapWasteType = (type: WasteGuideResponseType): WasteType => {
  if (type === 'grofvuil') {
    return WasteType.Bulky
  }
  return WasteType.Household
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
              {wasteGuide?.[WasteType.Bulky] && (
                <WasteGuideForBulkyWaste
                  details={wasteGuide[WasteType.Bulky]!}
                />
              )}
              {wasteGuide?.[WasteType.Household] && (
                <>
                  {wasteGuide[WasteType.Bulky] && (
                    <Gutter height={size.spacing.md} />
                  )}
                  <WasteGuideForHouseholdWaste
                    details={wasteGuide[WasteType.Household]!}
                  />
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
