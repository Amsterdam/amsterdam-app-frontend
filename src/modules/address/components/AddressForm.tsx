import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {TextInput} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui/containers'
import {NumberInput, StreetInput} from '@/modules/address/components'
import {config} from '@/modules/address/config'
import {AddressModalName} from '@/modules/address/routes'
import {addAddress} from '@/modules/address/slice'
import {DeviceContext} from '@/providers'
import {useGetAddressQuery, useGetBagQuery} from '@/services/address'

const removeWeespSuffix = (streetName: string) =>
  streetName.includes('Weesp')
    ? streetName.replace(/ \(Weesp\)/g, '')
    : streetName

export const AddressForm = () => {
  const {isLandscape, isTablet} = useContext(DeviceContext)
  const dispatch = useDispatch()
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const address = `${street} ${number}`

  const inputStreetRef = useRef<TextInput | null>(null)
  const {streetLengthThreshold} = config

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, AddressModalName.addressForm>
    >()

  const {data: bagData} = useGetBagQuery(address, {
    skip: address?.length < streetLengthThreshold,
  })

  const bagList = useMemo(
    () =>
      bagData?.find(
        item => item.label === 'Straatnamen' || item.label === 'Adressen',
      ),
    [bagData],
  )

  const isCompleteAddress = bagList?.label === 'Adressen' // indicator from BE response that the address is complete
  const isAddressComplete =
    isNumberSelected && isStreetSelected && isCompleteAddress

  const {data: addressData} = useGetAddressQuery(address, {
    skip: !isAddressComplete,
  })

  const changeNumber = (text: string) => {
    setNumber(text.replace(/[^0-9]/gi, ''))
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
    isCompleteAddress && setIsNumberSelected(true)
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
          keyboardType="numeric"
          number={number}
          selectNumber={selectNumber}
          street={street}
        />
      )}
    </Box>
  )
}
