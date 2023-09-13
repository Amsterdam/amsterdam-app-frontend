import {useMemo} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Icon} from '@/components/ui/media/Icon'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {AddressSearchSuggestionsForLocation} from '@/modules/address/components/location/AddressSearchSuggestionsForLocation'
import {config} from '@/modules/address/config'
import {PdokAddress} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'

type StreetSearchResultProps = {
  bagList: PdokAddress[]
  isLoading: boolean
  isStreetSelected: boolean
  pdokAddresses: PdokAddress[]
  selectResult: (item: PdokAddress) => void
  street: string
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
  const addresses = useMemo(() => {
    if (bagList.length > 0) {
      return bagList
    }

    if (pdokAddresses.length > 0) {
      return pdokAddresses.filter(addressIsInAmsterdamMunicipality)
    }
  }, [bagList, pdokAddresses])

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

  if (!hasStreetInput) {
    return (
      <AddressSearchSuggestionsForLocation
        addresses={addresses}
        selectResult={selectResult}
      />
    )
  }

  return (
    <AddressSearchSuggestions
      addresses={addresses}
      selectResult={selectResult}
    />
  )
}
