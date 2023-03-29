import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {TextInput} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui/containers'
import {NumberInput, StreetInput} from '@/modules/address/components'
import {config} from '@/modules/address/config'
import {AddressModalName} from '@/modules/address/routes'
import {addAddress} from '@/modules/address/slice'
import {AddressCity} from '@/modules/address/types'
import {DeviceContext} from '@/providers'
import {useGetAddressQuery, useGetBagQuery} from '@/services/address'

export const AddressForm = () => {
  const {isLandscape, isTablet} = useContext(DeviceContext)
  const dispatch = useDispatch()
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [city, setCity] = useState<AddressCity>(AddressCity.Amsterdam)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const address = `${street} ${number}`

  const inputStreetRef = useRef<TextInput | null>(null)
  const {addressLengthThreshold} = config

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, AddressModalName.addressForm>
    >()

  const removeWeespSuffix = useCallback((streetName: string) => {
    if (streetName.includes(AddressCity.Weesp)) {
      setCity(AddressCity.Weesp)
      return streetName.replace(/ \(Weesp\)/g, '')
    }
    setCity(AddressCity.Amsterdam)
    return streetName
  }, [])

  const {data: bagData} = useGetBagQuery(address, {
    skip: address?.length < addressLengthThreshold,
  })

  const bagList = bagData?.find(
    ({label}) => label === 'Adressen' || label === 'Straatnamen',
  )

  const isAddress = bagList?.label === 'Adressen' // indicator from BE response that the address is complete
  const isAddressComplete = isNumberSelected && isStreetSelected && isAddress

  const {data: addressData} = useGetAddressQuery(
    {address, city},
    {
      skip: !isAddressComplete,
    },
  )

  const changeNumber = (text: string) => {
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
    setStreet(removeWeespSuffix(text))
    setIsStreetSelected(true)
    isAddress && setIsNumberSelected(true)
  }

  useEffect(() => {
    if (addressData) {
      dispatch(addAddress(addressData))
      navigation.goBack()
    }
  }, [addressData, dispatch, navigation])

  return (
    <Box
      grow
      insetHorizontal="md"
      insetVertical={isLandscape && !isTablet ? 'no' : 'md'}>
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
          changeIsStreetSelected={setIsStreetSelected}
          changeNumber={changeNumber}
          city={city}
          keyboardType="numeric"
          number={number}
          selectNumber={selectNumber}
          street={street}
        />
      )}
    </Box>
  )
}
