import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {PdokAddress} from '@/modules/address/types'

type NumberSearchResultProps = {
  bagList: PdokAddress[]
  number: string
  selectResult: (item: PdokAddress) => void
}

const showSuggestion = (suggestion: PdokAddress): string =>
  `${suggestion.huisnummer}${suggestion.huisletter ?? ''}${
    suggestion.huisnummertoevoeging ? `-${suggestion.huisnummertoevoeging}` : ''
  }`

export const NumberSearchResult = ({
  bagList,
  selectResult,
  number,
}: NumberSearchResultProps) => {
  if (number.length < 1) {
    return null
  }

  if (bagList.length === 0) {
    return (
      <Box insetVertical="md">
        <EmptyMessage text="Huisnummer niet gevonden. Controleer het huisnummer. Of probeer een ander nummer." />
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
