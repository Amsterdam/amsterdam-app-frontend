import {Box} from '@/components/ui/containers'
import {EmptyMessage} from '@/components/ui/feedback'
import {SuggestionButton} from '@/modules/address/components'
import {
  AddressCity,
  BagResponse,
  BagResponseContent,
} from '@/modules/address/types'

type NumberSearchResultProps = {
  bagList: BagResponse | null | undefined
  city: AddressCity
  number: string
  selectNumber: (text: string) => void
}

const getNumberFromAddress = (text: string) =>
  text
    .split(' ')
    .reverse()
    .find(el => el.match(/^[0-9]/)) || ''

const getNumbersForCity = (addresses: BagResponseContent, city: string) =>
  addresses.filter(({_display}) =>
    city === AddressCity.Weesp
      ? _display.includes(AddressCity.Weesp)
      : !_display.includes(AddressCity.Weesp),
  )

export const NumberSearchResult = ({
  bagList,
  city,
  selectNumber,
  number,
}: NumberSearchResultProps) => {
  const numbersForCity = bagList
    ? getNumbersForCity(bagList?.content, city)
    : []

  if (number.length < 1) {
    return null
  }

  if (!numbersForCity.length) {
    return (
      <Box insetVertical="md">
        <EmptyMessage text="Huisnummer niet gevonden. Controleer het huisnummer. Of probeer een ander nummer." />
      </Box>
    )
  }

  return (
    <>
      {numbersForCity.map(bagItem => (
        <SuggestionButton
          key={bagItem._display}
          label={getNumberFromAddress(bagItem._display)}
          onPress={() => {
            selectNumber(getNumberFromAddress(bagItem._display))
          }}
          testID={`AddressSearchResult${bagItem._display}Button`}
        />
      ))}
    </>
  )
}
