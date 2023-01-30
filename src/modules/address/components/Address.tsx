import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Column} from '@/components/ui/layout'
import {
  BoxTitle,
  DisplayAddress,
  RequestAddress,
} from '@/modules/address/components'
import {selectAddress} from '@/modules/address/slice'

export const Address = () => {
  const address = useSelector(selectAddress)

  return (
    <Box distinct>
      <Column gutter="md">
        <BoxTitle />
        {address.adres ? (
          <DisplayAddress address={address} />
        ) : (
          <RequestAddress />
        )}
      </Column>
    </Box>
  )
}
