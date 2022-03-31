import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useRef, useState} from 'react'
import {StackParams} from '../../../app/navigation'
import {useAsyncStorage} from '../../../hooks'
import {useGetAddressQuery, useGetBagQuery} from '../../../services/address'
import {BagResponseContent} from '../../../types'
import {Box} from '../../ui'
import {NumberInput, StreetInput} from './'

export const AddressForm = () => {
  const asyncStorage = useAsyncStorage()
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const inputStreetRef = useRef<any>()

  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()

  const removeWeespSuffix = (streetName: string) => {
    return streetName.includes('Weesp')
      ? streetName.replace(/ \(Weesp\)/g, '')
      : streetName
  }

  const {data: addressData} = useGetAddressQuery(
    `${removeWeespSuffix(street)} ${number}`,
    {
      skip: !isNumberSelected,
    },
  )
  const {data: bagData} = useGetBagQuery(
    `${removeWeespSuffix(street)} ${number}`,
  )

  const changeNumber = (text: string) => {
    setIsNumberSelected(false)
    setNumber(text)
  }

  const changeStreet = (text: string) => {
    setIsStreetSelected(false)
    setStreet(text)
    setNumber('')
  }

  const selectNumber = (text: string) => {
    setNumber(text)
    setIsNumberSelected(true)
  }

  const selectStreet = (text: string) => {
    setStreet(text)
    setIsStreetSelected(true)
  }

  useEffect(() => {
    const suggestions = bagData?.find(
      item => item.label === 'Straatnamen' || item.label === 'Adressen',
    )
    setBagList(suggestions?.content)
  }, [bagData])

  useEffect(() => {
    if (addressData) {
      asyncStorage.storeData('address', addressData)
      navigation.goBack()
    }
  }, [addressData, asyncStorage, navigation])

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
