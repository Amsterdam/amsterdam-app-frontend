import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressModalName} from '@/modules/address/routes'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const ProvideAddressButton = () => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  return (
    <Row align="start">
      <Button
        iconName="location"
        label="Vul uw adres in"
        onPress={() => navigation.navigate(AddressModalName.addressForm)}
      />
    </Row>
  )
}
