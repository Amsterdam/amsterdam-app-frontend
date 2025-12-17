import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {BaseAddress, Address, AddressList} from '@/modules/address/types'
import {getSuggestionLabel} from '@/modules/address/utils/getSuggestionLabel'
import {addressPronounce} from '@/utils/accessibility/addressPronounce'

type Props = {
  addresses?: AddressList
  selectResult: (item: Address | BaseAddress) => void
  showNumbersOnly?: boolean
}

export const AddressSearchSuggestions = ({
  addresses = [],
  selectResult,
  showNumbersOnly = false,
}: Props) => (
  <>
    {addresses.map(address => {
      const key =
        'bagId' in address
          ? address.bagId
          : [address.street, address.city].join('-')

      return (
        <SuggestionButton
          accessibilityLabel={addressPronounce(
            getSuggestionLabel(address, showNumbersOnly),
          )}
          address={address}
          key={key}
          label={getSuggestionLabel(address, showNumbersOnly)}
          logging-label="AddressSearchResultButton"
          onPress={selectResult}
          testID={`AddressSearchResult${key}Button`}
        />
      )
    })}
  </>
)
