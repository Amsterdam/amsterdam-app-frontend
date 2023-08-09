import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressModalName} from '@/modules/address/routes'

export const ProvideAddressButton = () => {
  const navigation = useNavigation()

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
