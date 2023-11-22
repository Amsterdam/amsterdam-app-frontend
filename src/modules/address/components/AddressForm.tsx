import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, useRef, useState} from 'react'
import {TextInput} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {NumberInput} from '@/modules/address/components/NumberInput'
import {StreetInput} from '@/modules/address/components/StreetInput'
import {config} from '@/modules/address/config'
import {AddressModalName} from '@/modules/address/routes'
import {useGetAddressSuggestionsQuery} from '@/modules/address/service'
import {addAddress} from '@/modules/address/slice'
import {AddressCity, PdokAddress} from '@/modules/address/types'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'
import {resetAlert, setAlert} from '@/store/slices/alert'

export const AddressForm = () => {
  const {isLandscape, isTablet} = useDeviceContext()
  const dispatch = useDispatch()
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [city, setCity] = useState<AddressCity | undefined>(undefined)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const address = `${street} ${number}`

  const inputStreetRef = useRef<TextInput | null>(null)
  const {addressLengthThreshold} = config

  const navigation = useNavigation<AddressModalName>()

  const {currentData: bagList, isFetching: isFetchingBagList} =
    useGetAddressSuggestionsQuery(
      {address, city, street: isStreetSelected ? street : undefined},
      {
        skip: address?.length < addressLengthThreshold,
      },
    )

  const changeStreet = (text: string) => {
    setIsStreetSelected(false)
    setCity(undefined)
    setStreet(text)
    setNumber('')
  }

  const selectResult = useCallback(
    (item: PdokAddress) => {
      if (item.type === 'weg') {
        setIsStreetSelected(true)
        setStreet(item.straatnaam)
        setCity(item.woonplaatsnaam)
      } else {
        dispatch(addAddress(transformAddressApiResponse(item)))
        dispatch(
          setAlert({
            closeType: AlertCloseType.withoutButton,
            content: {
              title: 'Gelukt',
              text: 'Het adres is toegevoegd aan uw profiel.',
            },
            testID: 'AddressAddedAlert',
            variant: AlertVariant.positive,
            withIcon: false,
          }),
        )
        navigation.goBack()
      }
    },
    [dispatch, navigation],
  )

  useFocusEffect(() => {
    dispatch(resetAlert())
  })

  useEffect(() => {
    if (!isStreetSelected) {
      setCity(undefined)
    }
  }, [isStreetSelected])

  return (
    <Box
      grow
      insetHorizontal="md"
      insetVertical={isLandscape && !isTablet ? 'no' : 'md'}>
      {!isStreetSelected ? (
        <StreetInput
          bagList={bagList?.response.docs ?? []}
          changeStreet={changeStreet}
          inputStreetRef={inputStreetRef}
          isLoading={isFetchingBagList}
          isStreetSelected={isStreetSelected}
          selectResult={selectResult}
          street={street}
        />
      ) : (
        <NumberInput
          bagList={bagList?.response.docs ?? []}
          changeIsStreetSelected={setIsStreetSelected}
          changeNumber={setNumber}
          isLoading={isFetchingBagList}
          keyboardType="numeric"
          number={number}
          selectResult={selectResult}
          street={street}
        />
      )}
    </Box>
  )
}
