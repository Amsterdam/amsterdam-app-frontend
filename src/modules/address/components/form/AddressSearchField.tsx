import {useFormContext} from 'react-hook-form'
import {Box} from '@/components/ui/containers/Box'
import {type AddressSearchFields} from '@/modules/address/components/AddressForm'
import {NumberSearchField} from '@/modules/address/components/form/NumberSearchField'
import {StreetSearchField} from '@/modules/address/components/form/StreetSearchField'

export const AddressSearchField = () => {
  const {watch} = useFormContext<AddressSearchFields>()

  const cityValue = watch('city')
  const selectNumberSearch = !!cityValue

  return (
    <Box
      insetHorizontal="md"
      insetVertical="no">
      {selectNumberSearch ? <NumberSearchField /> : <StreetSearchField />}
    </Box>
  )
}
