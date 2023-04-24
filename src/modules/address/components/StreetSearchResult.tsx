import {Box} from '@/components/ui/containers'
import {EmptyMessage, Spinner} from '@/components/ui/feedback'
import {SuggestionButton} from '@/modules/address/components'
import {config} from '@/modules/address/config'
import {BagResponse} from '@/modules/address/types'

type StreetSearchResultProps = {
  bagList: BagResponse | null | undefined
  isLoading: boolean
  isStreetSelected: boolean
  selectStreet: (text: string) => void
  street: string
}

export const StreetSearchResult = ({
  bagList,
  isLoading,
  isStreetSelected,
  selectStreet,
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

  if (!bagList) {
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
      {bagList.content.map(bagItem => (
        <SuggestionButton
          key={bagItem.uri}
          label={bagItem._display}
          onPress={() => {
            selectStreet(bagItem._display)
          }}
        />
      ))}
    </>
  )
}
