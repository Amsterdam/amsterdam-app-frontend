import {useState} from 'react'
import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {Address, BaseAddress} from '@/modules/address/types'
import {NumberSearch} from '@/modules/address/components/form/NumberSearch'
import {StreetSearch} from '@/modules/address/components/form/StreetSearch'

export const AddressSearch = ({
  onPressAddress,
}: {
  onPressAddress: (address: Address) => void
}) => {
  const form = useFormContext<AddressSearchFields>()
  const [requestNumber, setRequestNumber] = useState(false)

  const {setValue} = form

  const selectAddress = (selectedAddress: Address | BaseAddress) => {
    if (selectedAddress.type !== 'adres') {
      return handleIncompleteAddress(selectedAddress)
    }

    onPressAddress(selectedAddress)
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
      {requestNumber ? (
        <NumberSearch
          onPressBack={handlePressBack}
          onPressResult={selectAddress}
        />
      ) : (
        <StreetSearch onPressResult={selectAddress} />
      )}
    </>
  )
}
