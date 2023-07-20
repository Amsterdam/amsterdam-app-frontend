import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
<<<<<<< HEAD
import {RootStackParams} from '@/app/navigation/types'
=======
import {RootStackParams} from '@/app/navigation'
>>>>>>> c5c96f75 (Merge components to display or request address)
import {Button} from '@/components/ui/buttons/Button'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {AddressModalName} from '@/modules/address/routes'
import {removeAddress, selectAddress} from '@/modules/address/slice'
import {userModule} from '@/modules/user'
import {setAlert} from '@/store/slices/alert'

export const DisplayAddress = () => {
  const address = useSelector(selectAddress)
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
<<<<<<< HEAD
    <Row>
      <Column flex={1}>
        <TopTaskButton
          accessibilityHint="Tik om het adres te wijzigen"
          iconName="location"
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
          testID="AddressAddButton"
          text={address?.addressLine1 ?? 'Vul een adres in'}
          title="Mijn adres"
        />
      </Column>
=======
    <Column gutter="md">
      <TopTaskButton
        iconName="location"
        onPress={() => navigation.navigate(AddressModalName.addressForm)}
        testID="AddressAddButton"
        text={address === undefined ? 'Vul een adres in' : address.addressLine1}
        title="Mijn adres"
      />
>>>>>>> c5c96f75 (Merge components to display or request address)
      {!!address && (
        <Row>
          <Button
            accessibilityLabel="Verwijder mijn adres"
            iconName="trash-bin"
            onPress={removeAddressAndShowAlert}
            testID="AddressDeleteButton"
            variant="tertiary"
          />
        </Row>
      )}
    </Row>
  )
}
