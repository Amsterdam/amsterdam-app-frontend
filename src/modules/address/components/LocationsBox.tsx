import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Title} from '@/components/ui/text/Title'
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
        <Column gutter="md">
          <Box
            insetHorizontal="md"
            insetVertical="no">
            <Title
              level="h2"
              testID="AddressTitle"
              text="Adres"
            />
          </Box>
          <DisplayAddress />
        </Column>
      </Box>

      <Box
        insetHorizontal="md"
        insetVertical="no">
        <InlineLink
          onPress={() => {
            navigation.navigate(AddressModalName.privacyInfo)
          }}
          phraseVariant="small">
          Zo gebruiken wij uw locatie en adres.
        </InlineLink>
      </Box>
    </Column>
  )
}
