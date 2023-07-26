import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Title} from '@/components/ui/text/Title'
import {DisplayAddress} from '@/modules/address/components/DisplayAddress'
import {AddressModalName} from '@/modules/address/routes'
import {userModule} from '@/modules/user'

export const LocationsBox = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  return (
    <Column gutter="md">
      <Box distinct>
        <Column gutter="md">
          <Title
            level="h2"
            testID="AddressTitle"
            text="Locaties"
          />
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
          Hoe gebruiken we uw adres en locatie?
        </InlineLink>
      </Box>
    </Column>
  )
}
