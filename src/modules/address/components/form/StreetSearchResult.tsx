import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Icon} from '@/components/ui/media/Icon'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {BaseAddress, Address, AddressList} from '@/modules/address/types'

type StreetSearchResultProps = {
  bagList: AddressList
  isError: boolean
  isLoading: boolean
  refetch: () => void
  selectResult: (item: Address | BaseAddress) => void
}

export const StreetSearchResult = ({
  bagList,
  isError,
  isLoading,
  refetch,
  selectResult,
}: StreetSearchResultProps) => {
  if (isLoading) {
    return (
      <Box>
        <Icon
          color="link"
          name="spinner"
          size="lg"
          testID="AddressStreetSearchResultLoadingIcon"
        />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box insetVertical="md">
        <SomethingWentWrong
          retryFn={refetch}
          testID="AddressStreetSearchResultSomethingWentWrong"
          text="Door een technische storing kunnen er geen adressen worden gevonden. Probeer het later nog eens."
          title=""
        />
      </Box>
    )
  }

  if (bagList.length === 0) {
    return (
      <Box insetVertical="md">
        <EmptyMessage
          testID="AddressStreetSearchNoResultsMessage"
          text="Straatnaam niet gevonden. Controleer uw spelling of probeer een adres
        in de buurt."
        />
      </Box>
    )
  }

  return (
    <AddressSearchSuggestions
      addresses={bagList}
      selectResult={selectResult}
    />
  )
}
