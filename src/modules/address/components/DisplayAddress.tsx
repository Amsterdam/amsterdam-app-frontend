import {ReactNode} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {SwipeToDelete} from '@/components/ui/buttons/SwipeToDelete'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {AddressModalName} from '@/modules/address/routes'
import {removeAddress, selectAddress} from '@/modules/address/slice'
import {Address} from '@/modules/address/types'
import {setAlert} from '@/store/slices/alert'
import {useTheme} from '@/themes/useTheme'

type AddressDeleteButtonProps = {
  address?: Address
  children: ReactNode
  onDelete: () => void
}

const AddressDeleteButton = ({
  address,
  onDelete,
  children,
}: AddressDeleteButtonProps) => {
  if (address) {
    return (
      <SwipeToDelete onEvent={onDelete}>
        <Row>
          {children}
          <Button
            accessibilityLabel="Verwijder mijn adres"
            iconName="trash-bin"
            onPress={onDelete}
            testID="AddressDeleteButton"
            variant="tertiary"
          />
        </Row>
      </SwipeToDelete>
    )
  }

  return <>{children}</>
}

export const DisplayAddress = () => {
  const address = useSelector(selectAddress)
  const dispatch = useDispatch()
  const navigation = useNavigation<AddressModalName>()
  const {size} = useTheme()

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
    <Row>
      <Column flex={1}>
        <AddressDeleteButton
          address={address}
          onDelete={removeAddressAndShowAlert}>
          <TopTaskButton
            accessibilityHint="Tik om het adres te wijzigen"
            hitSlop={{bottom: size.spacing.md, top: size.spacing.md}}
            iconName="location"
            onPress={() => navigation.navigate(AddressModalName.addressForm)}
            testID="AddressAddButton"
            text={address?.addressLine1 ?? 'Vul een adres in'}
            title="Mijn adres"
          />
        </AddressDeleteButton>
      </Column>
    </Row>
  )
}
