import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {NumberInput, StreetInput} from './'
import {StackParams} from '../../../app/navigation'
import {useFetch} from '../../../hooks'
import {SettingsContext} from '../../../providers'
import {
  Address,
  ApiAddress,
  BagResponse,
  BagResponseContent,
  ResponseAddress,
} from '../../../types'
import {Box} from '../../ui'

export const AddressForm = ({tempAddress = false}: {tempAddress?: boolean}) => {
  const [address, setAddress] = useState<ResponseAddress | undefined>()
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const inputStreetRef = useRef<any>()

  const {changeSettings} = useContext(SettingsContext)

  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()

  const addressApi = useFetch<ResponseAddress>({
    onLoad: false,
    options: {params: {features: 2}}, // features: 2 includes addresses in Weesp.
    url: 'https://api.data.amsterdam.nl/atlas/search/adres/',
  })

  const bagApi = useFetch<BagResponse[]>({
    onLoad: false,
    options: {params: {features: 2}}, // features: 2 includes addresses in Weesp.
    url: 'https://api.data.amsterdam.nl/atlas/typeahead/bag/',
  })

  const changeNumber = (text: string) => {
    setIsNumberSelected(false)
    setNumber(text)
  }

  const changeStreet = (text: string) => {
    setIsStreetSelected(false)
    setStreet(text)
    setNumber('')
  }

  const removeWeespSuffix = (streetName: string) => {
    return streetName.replace(/ \(Weesp\)/g, '')
  }

  const selectNumber = (text: string) => {
    setNumber(text)
    setIsNumberSelected(true)
  }

  const selectStreet = (text: string) => {
    setStreet(text)
    setIsStreetSelected(true)
  }

  const transformAddress = (responseAddress: ApiAddress): Address => {
    const {
      adres,
      bag_huisletter,
      bag_toevoeging,
      centroid,
      huisnummer,
      postcode,
      straatnaam,
      woonplaats,
    } = responseAddress
    return {
      adres,
      bag_huisletter,
      bag_toevoeging,
      centroid,
      huisnummer,
      postcode,
      straatnaam,
      woonplaats,
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    bagApi.fetchData({q: street})
  }, [street])

  useEffect(() => {
    const streetWithoutWeespSuffix = removeWeespSuffix(street)
    isStreetSelected && isNumberSelected
      ? addressApi.fetchData({
          q: `${streetWithoutWeespSuffix} ${number}`,
        })
      : bagApi.fetchData({
          q: `${streetWithoutWeespSuffix} ${number}`,
        })
  }, [number, isNumberSelected, isStreetSelected])

  useEffect(() => {
    const suggestions = bagApi.data?.find(
      item => item.label === 'Straatnamen' || item.label === 'Adressen',
    )
    setBagList(suggestions?.content)
  }, [bagApi.data])

  useEffect(() => {
    setAddress(addressApi.data)
  }, [addressApi.data])

  useEffect(() => {
    if (address) {
      const transformedAddress = transformAddress(address?.results[0])
      tempAddress
        ? changeSettings('temp', {address: transformedAddress})
        : changeSettings('address', transformedAddress)
      navigation.goBack()
    }
  }, [address])

  return (
    <Box background="white" inset="lg">
      {!isStreetSelected ? (
        <StreetInput
          bagList={bagList}
          changeStreet={changeStreet}
          inputStreetRef={inputStreetRef}
          isStreetSelected={isStreetSelected}
          selectStreet={selectStreet}
          street={street}
        />
      ) : (
        <NumberInput
          bagList={bagList}
          changeNumber={changeNumber}
          changeIsStreetSelected={setIsStreetSelected}
          isNumberSelected={isNumberSelected}
          keyboardType="numeric"
          number={number}
          selectNumber={selectNumber}
          street={street}
        />
      )}
    </Box>
  )
}
