import {Box} from '@/components/ui/containers'
import {EmptyMessage, Spinner} from '@/components/ui/feedback'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {config} from '@/modules/address/config'
import {AddressSuggestion} from '@/modules/address/types'
import {getAddressLine1} from '@/modules/address/utils/transformAddressApiResponse'

type StreetSearchResultProps = {
  bagList: AddressSuggestion[]
  isLoading: boolean
  isStreetSelected: boolean
  selectResult: (item: AddressSuggestion) => void
  street: string
}

const showSuggestion = (suggestion: AddressSuggestion): string => {
  if (suggestion.type === 'weg') {
    if (suggestion.woonplaatsnaam === 'Amsterdam') {
      return suggestion.straatnaam
    } else {
      return `${suggestion.straatnaam}, ${suggestion.woonplaatsnaam}`
    }
  }

  const streetAndHouseNumber = getAddressLine1(suggestion)

  if (suggestion.woonplaatsnaam === 'Amsterdam') {
    return streetAndHouseNumber
  } else {
    return `${streetAndHouseNumber}, ${suggestion.woonplaatsnaam}`
  }
}

export const StreetSearchResult = ({
  bagList,
  isLoading,
  isStreetSelected,
  selectResult,
  street,
}: StreetSearchResultProps) => {
  const {addressLengthThreshold} = config

  if (isStreetSelected || street.length < addressLengthThreshold) {
    return null
  }

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    )
  }

  if (bagList.length === 0) {
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
    <>
      {bagList.map(bagItem => (
        <SuggestionButton
          key={bagItem.id}
          label={showSuggestion(bagItem)}
          onPress={() => {
            selectResult(bagItem)
          }}
          testID={`AddressSearchResult${bagItem.id}Button`}
        />
      ))}
    </>
  )
}
