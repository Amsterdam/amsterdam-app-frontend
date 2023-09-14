import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Icon} from '@/components/ui/media/Icon'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {PdokAddress} from '@/modules/address/types'

type StreetSearchResultProps = {
  bagList: PdokAddress[]
  isLoading: boolean
  selectResult: (item: PdokAddress) => void
}

export const StreetSearchResult = ({
  bagList,
  isLoading,
  selectResult,
}: StreetSearchResultProps) => {
  if (isLoading) {
    return (
      <Box>
        <Icon
          color="link"
          name="spinner"
          size="lg"
        />
      </Box>
    )
  }

  if (bagList.length === 0 && !isLoading) {
    return (
      <Box insetVertical="md">
        <EmptyMessage
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
