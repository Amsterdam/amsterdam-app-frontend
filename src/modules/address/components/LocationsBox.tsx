import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {DisplayAddress} from '@/modules/address/components/DisplayAddress'
import {AddressModalName} from '@/modules/address/routes'

export const LocationsBox = () => {
  const navigation = useNavigation<AddressModalName>()

  return (
    <Column gutter="md">
      <Box
        distinct
        insetHorizontal="no"
        insetVertical="md">
        <DisplayAddress />
      </Box>
      <InlineLink
        onPress={() => {
          navigation.navigate(AddressModalName.privacyInfo)
        }}
        phraseVariant="small"
        testID="AddressUseOfLocationLink">
        Zo gebruiken wij uw locatie en adres
      </InlineLink>
    </Column>
  )
}
