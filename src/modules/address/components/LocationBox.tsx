import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {DisplayAddress} from '@/modules/address/components/DisplayAddress'

export const LocationBox = () => (
  <Box distinct>
    <Column gutter="md">
      <Title
        level="h2"
        testID="AddressTitle"
        text="Locatie"
      />
      <DisplayAddress />
    </Column>
  </Box>
)
