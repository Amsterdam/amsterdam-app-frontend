import React, {useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {AddressForm} from '../../components/features/AddressForm'
import {Box, Gutter, Text, Title} from '../../components/ui'
import {useFetch} from '../../hooks/useFetch'
import {size} from '../../tokens'
import {Address} from '../../types/address'

type WasteGuide = {
  features: WasteGuideFeature[]
  type: string
}

type WasteGuideFeature = {
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
  const [wasteGuide, setWasteGuide] = useState<WasteGuide | undefined>(
    undefined,
  )

  const api = useFetch<WasteGuide>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
  })

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    api.fetchData({
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    })
  }, [address])

  useEffect(() => {
    setWasteGuide(api.data ?? undefined)
  }, [api.data])

  return (
    <>
      <Box background="lighter">
        <Title level={2} text="Uw adres" />
        <Text>
          Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval.
        </Text>
        <Gutter height={size.spacing.md} />
        <AddressForm onSubmit={text => setAddress(text)} />
        {api.isLoading && (
          <Box>
            <ActivityIndicator />
          </Box>
        )}
      </Box>
      {wasteGuide?.features?.map((f: WasteGuideFeature) => (
        <Box key={JSON.stringify(f)}>
          {Object.entries(f.properties).map(p => {
            return (
              p[1] && (
                <Text key={p[0]}>
                  {p[0]}: {p[1]}
                </Text>
              )
            )
          })}
        </Box>
      ))}
    </>
  )
}
