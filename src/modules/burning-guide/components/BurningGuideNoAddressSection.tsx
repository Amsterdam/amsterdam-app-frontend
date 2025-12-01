import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuideNoAddressSection = () => {
  const {navigate} = useNavigation()

  return (
    <Column gutter="md">
      <Title
        testID="BurningGuideScreenTitle"
        text="Geen adres"
      />
      <Paragraph testID="BurningGuideScreenText">
        Voer een adres in om uw stookwijzer informatie te bekijken.
      </Paragraph>

      <Button
        label="Adres invullen"
        onPress={() =>
          navigate(ModuleSlug.address, {screen: AddressRouteName.address})
        }
        testID="BurningGuideScreenButton"
      />
    </Column>
  )
}
