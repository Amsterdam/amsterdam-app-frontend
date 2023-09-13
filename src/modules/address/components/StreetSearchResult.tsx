import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {config} from '@/modules/address/config'
import {PdokAddress} from '@/modules/address/types'
import {getAddressLine1} from '@/modules/address/utils/transformAddressApiResponse'

type StreetSearchResultProps = {
  bagList: PdokAddress[]
  isLoading: boolean
  isStreetSelected: boolean
  pdokAddresses: PdokAddress[]
  selectResult: (item: PdokAddress) => void
  street: string
}

const showSuggestion = (suggestion: PdokAddress): string => {
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
  pdokAddresses,
  selectResult,
  street,
}: StreetSearchResultProps) => {
  const {addressLengthThreshold} = config
  const hasStreetInput = street.length > 0
  const isBelowCharacterThreshold = street.length < addressLengthThreshold
  const addresses = bagList.length
    ? bagList
    : pdokAddresses.length
    ? pdokAddresses
    : []

  if ((hasStreetInput && isBelowCharacterThreshold) || isStreetSelected) {
    return null
  }

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

  if (bagList.length === 0 && !isBelowCharacterThreshold && !isLoading) {
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
      {!hasStreetInput && addresses.length > 0 && (
        <Box insetTop="md">
          <Phrase>Suggesties</Phrase>
        </Box>
      )}
      {addresses.map(bagItem => (
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
