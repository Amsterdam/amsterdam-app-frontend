import {View} from 'react-native'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {PdokAddress} from '@/modules/address/types'
import {getSuggestionLabel} from '@/modules/address/utils/getSuggestionLabel'

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
  <View>
    {addresses.map(pdokAddress => (
      <SuggestionButton
        key={pdokAddress.id}
        label={getSuggestionLabel(pdokAddress, showNumbersOnly)}
        pdokAddress={pdokAddress}
        selectResult={selectResult}
        testID={`AddressSearchResult${pdokAddress.id}Button`}
      />
    ))}
  </View>
)
