import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {PdokAddress} from '@/modules/address/types'
import {getSuggestionLabel} from '@/modules/address/utils/getSuggestionLabel'
import {addressPronounce} from '@/utils/accessibility/addressPronounce'

type Props = {
  addresses?: PdokAddress[]
  selectResult: (item: PdokAddress) => void
  showNumbersOnly?: boolean
}

export const AddressSearchSuggestions = ({
  addresses = [],
  selectResult,
  showNumbersOnly = false,
}: Props) => (
  <>
    {addresses.map(pdokAddress => (
      <SuggestionButton
        accessibilityLabel={addressPronounce(
          getSuggestionLabel(pdokAddress, showNumbersOnly),
        )}
        key={pdokAddress.id}
        label={getSuggestionLabel(pdokAddress, showNumbersOnly)}
        pdokAddress={pdokAddress}
        selectResult={selectResult}
        sentry-label="AddressSearchResultButton"
        testID={`AddressSearchResult${pdokAddress.id}Button`}
      />
    ))}
  </>
)
