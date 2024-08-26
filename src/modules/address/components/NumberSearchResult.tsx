import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Icon} from '@/components/ui/media/Icon'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {PdokAddress} from '@/modules/address/types'

type NumberSearchResultProps = {
  bagList: PdokAddress[]
  isError: boolean
  isLoading: boolean
  number: string
  refetch: () => void
  selectResult: (item: PdokAddress) => void
}

export const NumberSearchResult = ({
  bagList,
  isError,
  isLoading,
  refetch,
  selectResult,
  number,
}: NumberSearchResultProps) => {
  if (number.length < 1) {
    return null
  }

  if (isLoading) {
    return (
      <Box>
        <Icon
          color="link"
          name="spinner"
          size="lg"
          testID="AddressNumberSearchResultLoadingIcon"
        />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box insetVertical="lg">
        <SomethingWentWrong
          inset="no"
          retryFn={refetch}
          testID="AddressNumberSearchResultSomethingWentWrong"
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
          testID="AddressNumberSearchNoResultsMessage"
          text="Huisnummer niet gevonden. Controleer het huisnummer. Of probeer een ander nummer."
        />
      </Box>
    )
  }

  return (
    <AddressSearchSuggestions
      addresses={bagList}
      selectResult={selectResult}
      showNumbersOnly
    />
  )
}
