import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {AddressModalName} from '@/modules/address/routes'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const ProvideAddressButton = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParams,
        ConstructionWorkRouteName.constructionWork
      >
    >()

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
