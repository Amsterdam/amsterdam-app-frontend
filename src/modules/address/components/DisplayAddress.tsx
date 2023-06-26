import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {Address} from '@/modules/address'
import {AddressModalName} from '@/modules/address/routes'
import {removeAddress} from '@/modules/address/slice'
import {module as userModule} from '@/modules/user'
import {setAlert} from '@/store'

type Props = {
  address: Address
}

export const DisplayAddress = ({address}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  const removeAddressAndShowAlert = () => {
    dispatch(removeAddress())
    dispatch(
      setAlert({
        closeType: AlertCloseType.withoutButton,
        content: {
          title: 'Gelukt',
          text: 'Het adres is verwijderd uit uw profiel.',
        },
        testID: 'AddressDeletedAlert',
        variant: AlertVariant.positive,
        withIcon: false,
      }),
    )
  }

  return (
    <Column gutter="md">
      <Column>
        <Paragraph testID="AddressStreetnameAndNumberText">
          {address.addressLine1}
        </Paragraph>
        <Paragraph testID="AddressPostalcodeAndCityText">
          {address.addressLine2}
        </Paragraph>
      </Column>
      <Row
        gutter="md"
        wrap>
        <Button
          iconName="edit"
          label="Wijzig"
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
          small
          testID="AddressEditButton"
          variant="primary"
        />
        <Button
          iconName="trash-bin"
          label="Verwijder"
          onPress={removeAddressAndShowAlert}
          small
          testID="AddressDeleteButton"
          variant="secondary"
        />
      </Row>
    </Column>
  )
}
