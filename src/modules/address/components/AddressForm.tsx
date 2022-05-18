import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/query/react'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {Box} from '../../../components/ui'
import {useAsyncStorage} from '../../../hooks'
import {useGetAddressQuery, useGetBagQuery} from '../../../services/address'
import {BagResponseContent} from '../../../types'
import {addAddress, addTempAddress} from '../addressSlice'
import {NumberInput, StreetInput} from '.'

type Props = {
  temp?: boolean
}

export const AddressForm = ({temp}: Props) => {
  const asyncStorage = useAsyncStorage()
  const dispatch = useDispatch()
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const [isAddressStored, setIsAddressStored] = useState(false)
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

  const getAddress = useCallback(() => {
    if (number) {
      return [removeWeespSuffix(street), number].join(' ')
    }
    if (street) {
      return removeWeespSuffix(street)
    }
    return ''
  }, [number, street])

  const address = getAddress()

  const {data: addressData} = useGetAddressQuery(address ?? skipToken, {
    skip: !isNumberSelected,
  })

  const {data: bagData} = useGetBagQuery(address ?? skipToken, {
    skip: address?.length < 3,
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
      if (temp) {
        dispatch(addTempAddress(addressData))
      } else {
        asyncStorage.storeData('address', addressData)
        dispatch(addAddress(addressData))
      }
      setIsAddressStored(true)
    }
  }, [addressData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isAddressStored && navigation.goBack()
  }, [isAddressStored]) // eslint-disable-line react-hooks/exhaustive-deps

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
