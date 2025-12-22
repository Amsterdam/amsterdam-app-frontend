import {useCallback, useEffect, useRef, useState} from 'react'
import {TextInput} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {alerts} from '@/modules/address/alerts'
import {NumberInput} from '@/modules/address/components/NumberInput'
import {StreetInput} from '@/modules/address/components/StreetInput'
import {ADDRESS_LENGTH_THRESHOLD} from '@/modules/address/constants'
import {AddressModalName} from '@/modules/address/routes'
import {useGetAddressSuggestionsQuery} from '@/modules/address/service'
import {addAddress} from '@/modules/address/slice'
import {AddressCity, BaseAddress, Address} from '@/modules/address/types'
import {addDerivedAddressFields} from '@/modules/address/utils/addDerivedAddressFields'
import {replaceString} from '@/modules/address/utils/replaceString'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'

export const AddressForm = () => {
  const {isLandscape, isTablet} = useDeviceContext()
  const dispatch = useDispatch()
  const {setAlert} = useAlert()
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [city, setCity] = useState<AddressCity | undefined>(undefined)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const address = `${street} ${number}`

  const inputStreetRef = useRef<TextInput | null>(null)

  const navigation = useNavigation<AddressModalName>()

  const {
    currentData: bagList,
    isFetching: isFetchingBagList,
    isError,
    refetch,
  } = useGetAddressSuggestionsQuery(
    {address, city, street: isStreetSelected ? street : undefined},
    {
      skip: address?.length < ADDRESS_LENGTH_THRESHOLD,
    },
  )

  const changeStreet = useCallback((text: string) => {
    setIsStreetSelected(false)
    setCity(undefined)
    setStreet(replaceString(text, 'address'))
    setNumber('')
  }, [])

  const changeNumber = useCallback((text: string) => {
    setNumber(replaceString(text, 'houseNumber'))
  }, [])

  const previousRoute = usePreviousRoute()

  const selectResult = useCallback(
    (item: Address | BaseAddress) => {
      if (item.type !== 'adres') {
        setIsStreetSelected(true)
        setStreet(item.street)
        setCity(item.city)
      } else {
        const transformedAddress = addDerivedAddressFields(item)

        dispatch(addAddress(transformedAddress))

        if (previousRoute?.name === ModuleSlug.address) {
          setAlert(alerts.addAddressSuccess)
        }

        navigation.goBack()
      }
    },
    [dispatch, navigation, previousRoute?.name, setAlert],
  )

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
          bagList={bagList ?? []}
          changeStreet={changeStreet}
          inputStreetRef={inputStreetRef}
          isError={isError}
          isLoading={isFetchingBagList}
          isStreetSelected={isStreetSelected}
          refetch={refetch}
          selectResult={selectResult}
          street={street}
        />
      ) : (
        <NumberInput
          bagList={bagList ?? []}
          changeIsStreetSelected={setIsStreetSelected}
          changeNumber={changeNumber}
          isError={isError}
          isLoading={isFetchingBagList}
          keyboardType="numbers-and-punctuation"
          number={number}
          refetch={refetch}
          selectResult={selectResult}
          street={street}
        />
      )}
    </Box>
  )
}
