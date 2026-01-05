import {useState} from 'react'
import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {Address, BaseAddress} from '@/modules/address/types'
import {NumberSearchResults} from '@/modules/address/components/form/NumberSearchResults'
import {StreetSearchResults} from '@/modules/address/components/form/StreetSearchResults'

export const AddressSearchResults = ({
  onPressResult,
}: {
  onPressResult: (address: Address) => void
}) => {
  const form = useFormContext<AddressSearchFields>()
  const [requestNumber, setRequestNumber] = useState(false)

  const {setValue} = form

  const selectAddress = (selectedAddress: Address | BaseAddress) => {
    if (selectedAddress.type !== 'adres') {
      return handleIncompleteAddress(selectedAddress)
    }

    onPressResult(selectedAddress)
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
        <NumberSearchResults
          onPressBack={handlePressBack}
          onPressResult={selectAddress}
        />
      ) : (
        <StreetSearchResults onPressResult={selectAddress} />
      )}
    </>
  )
}
