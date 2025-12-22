import {useState} from 'react'
import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/screens/ChooseAddress.screen'
import type {Address, BaseAddress} from '@/modules/address/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/address/alerts'
import {NumberSearch} from '@/modules/address/components/form/NumberSearch'
import {StreetSearch} from '@/modules/address/components/form/StreetSearch'
import {addAddress} from '@/modules/address/slice'
import {addDerivedAddressFields} from '@/modules/address/utils/addDerivedAddressFields'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'

export const AddressForm = () => {
  const {setValue} = useFormContext<AddressSearchFields>()
  const [requestNumber, setRequestNumber] = useState(false)
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const {goBack} = useNavigation()
  const previousRoute = usePreviousRoute()

  const selectAddress = (selectedAddress: Address | BaseAddress) => {
    if (selectedAddress.type !== 'adres') {
      return handleIncompleteAddress(selectedAddress)
    }

    const transformedAddress = addDerivedAddressFields(selectedAddress)

    dispatch(addAddress(transformedAddress))

    if (previousRoute?.name === ModuleSlug.address) {
      setAlert(alerts.addAddressSuccess)
    }

    goBack()
  }

  const handleIncompleteAddress = (item: Address | BaseAddress) => {
    setValue('city', item.city)
    setValue('street', item.street)
    setRequestNumber(true)
  }

  const handlePressBack = () => {
    setValue('city', undefined)
    setValue('number', '')
    setRequestNumber(false)
  }

  return (
    <>
      {!requestNumber ? (
        <StreetSearch onPressResult={selectAddress} />
      ) : (
        <NumberSearch
          onPressBack={handlePressBack}
          onPressResult={selectAddress}
        />
      )}
    </>
  )
}
