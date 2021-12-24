import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {StyleSheet} from 'react-native'
import {HomeStackParamList} from '../../../App/navigation'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {AddressContext} from '../../../providers'
import {color, size} from '../../../tokens'
import {
  Address,
  BagResponse,
  BagResponseContent,
  ResponseAddress,
} from '../../../types'
import {Box} from '../../ui'
import {NumberInput, StreetInput} from './'

export const AddressForm = () => {
  const [address, setAddress] = useState<ResponseAddress | null>(null)
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const inputStreetRef = useRef<any>()

  const addressContext = useContext(AddressContext)

  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'Home'>>()

  const apiAddress = useFetch<any>({
    onLoad: false,
    options: {params: {features: 2}}, // features: 2 includes addresses in Weesp.
    url: 'https://api.data.amsterdam.nl/atlas/search/adres/',
  })

  const apiBag = useFetch<BagResponse[]>({
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

  const asyncStorage = useAsyncStorage()

  const transformAddress = (responseAddress: Address) => {
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

  const storeAddress = async (transformedAddress: Address) => {
    await asyncStorage.storeData('address', transformedAddress)
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    apiBag.fetchData({q: street})
  }, [street])

  useEffect(() => {
    const streetWithoutWeespSuffix = removeWeespSuffix(street)
    isStreetSelected && isNumberSelected
      ? apiAddress.fetchData({
          q: `${streetWithoutWeespSuffix} ${number}`,
        })
      : apiBag.fetchData({
          q: `${streetWithoutWeespSuffix} ${number}`,
        })
  }, [number, isNumberSelected, isStreetSelected])

  useEffect(() => {
    const suggestions = apiBag.data?.find(
      item => item.label === 'Straatnamen' || item.label === 'Adressen',
    )
    setBagList(suggestions?.content)
  }, [apiBag.data])

  useEffect(() => {
    setAddress(apiAddress.data)
  }, [apiAddress.data])

  useEffect(() => {
    if (address) {
      const transformedAddress = transformAddress(address?.results[0])
      addressContext.changeAddress(transformedAddress)
      addressContext.saveInStore
        ? storeAddress(transformedAddress).then(() => navigation.goBack())
        : navigation.goBack()
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
          styles={styles}
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
          styles={styles}
        />
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  backToStreet: {
    flexDirection: 'row',
  },
  streetInputWrapper: {
    height: '100%',
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: color.border.divider,
    borderStyle: 'solid',
  },
})
