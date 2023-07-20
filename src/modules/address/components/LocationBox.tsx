import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {DisplayAddress} from '@/modules/address/components/DisplayAddress'
import {RequestAddress} from '@/modules/address/components/RequestAddress'
import {selectAddress} from '@/modules/address/slice'

export const LocationBox = () => {
  const address = useSelector(selectAddress)

  return (
    <Box distinct>
      <Column gutter="md">
        <Title
          level="h2"
          testID="AddressTitle"
          text="Locatie"
        />
        {address ? <DisplayAddress address={address} /> : <RequestAddress />}
      </Column>
    </Box>
  )
}
