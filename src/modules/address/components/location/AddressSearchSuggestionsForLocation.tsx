import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {PdokAddress} from '@/modules/address/types'

type Props = {
  addresses?: PdokAddress[]
  selectResult: (item: PdokAddress) => void
}

export const AddressSearchSuggestionsForLocation = ({
  addresses = [],
  selectResult,
}: Props) => (
  <Box insetTop="lg">
    <Column gutter="sm">
      <Title
        level="h5"
        text="Suggesties"
      />
      {addresses.length === 0 && (
        <EmptyMessage
          showTitle={false}
          text="Geen suggesties gevonden voor je huidige locatie."
        />
      )}
      <AddressSearchSuggestions
        addresses={addresses}
        selectResult={selectResult}
      />
    </Column>
  </Box>
)
