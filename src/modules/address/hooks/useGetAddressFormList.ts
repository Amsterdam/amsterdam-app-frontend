import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/screens/ChooseAddress.screen'
import {ADDRESS_LENGTH_THRESHOLD} from '@/modules/address/constants'
import {useGetAddressSuggestionsQuery} from '@/modules/address/service'

export const useGetAddressFormList = (variant: 'street' | 'number') => {
  const {watch} = useFormContext<AddressSearchFields>()

  const street = watch('street')
  const city = watch('city')
  const number = watch('number')

  const address = `${street ?? ''} ${number ?? ''}`.trim()

  return {
    ...useGetAddressSuggestionsQuery(
      {address, city, street: variant === 'number' ? street : undefined},
      {
        skip: address?.length < ADDRESS_LENGTH_THRESHOLD,
      },
    ),
    shouldShowList: address.length >= ADDRESS_LENGTH_THRESHOLD,
  }
}
