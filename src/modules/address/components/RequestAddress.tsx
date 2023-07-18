import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation/types'
import {AddressModalName} from '@/modules/address/routes'
import {userModule} from '@/modules/user'
import { TopTaskButton } from '@/components/ui/buttons'

export const RequestAddress = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  return (
    <TopTaskButton
      iconName="location"
      onPress={() => navigation.navigate(AddressModalName.addressForm)}
      testID="AddressAddButton"
      text="Vul een adres in"
      title="Mijn adres"
    />
  )
}
