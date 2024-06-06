import {ReactNode} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {SwipeToDelete} from '@/components/ui/buttons/SwipeToDelete'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {AddressModalName} from '@/modules/address/routes'
import {removeAddress, selectAddress} from '@/modules/address/slice'
import {useAlert} from '@/store/slices/alert'
import {useTheme} from '@/themes/useTheme'

type AddressDeleteButtonProps = {
  canDelete: boolean
  children: ReactNode
  onDelete: () => void
}

const AddressDeleteButton = ({
  canDelete,
  onDelete,
  children,
}: AddressDeleteButtonProps) => {
  if (canDelete) {
    return (
      <SwipeToDelete
        onEvent={onDelete}
        showIcon={false}
        testID="AddressDeleteSwiper">
        <Row>
          <Row grow={1}>{children}</Row>
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
  const {setAlert} = useAlert()

  const removeAddressAndShowAlert = () => {
    dispatch(removeAddress())
    setAlert({
      title: 'Gelukt',
      text: 'Het adres is verwijderd uit uw profiel.',
      testID: 'AddressDeletedAlert',
      variant: AlertVariant.positive,
    })
  }

  return (
    <Row>
      <Column flex={1}>
        <AddressDeleteButton
          canDelete={!!address}
          onDelete={removeAddressAndShowAlert}>
          <TopTaskButton
            accessibilityHint="Tik om het adres te wijzigen"
            hitSlop={{bottom: size.spacing.md, top: size.spacing.md}}
            iconName="location"
            logName={
              address?.addressLine1 ? 'AddressChangeButton' : 'AddressAddButton'
            }
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
