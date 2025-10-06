import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useManageVisitorRemoveAccountMutation} from '@/modules/parking/service'

export const ManageVisitorRemoveAccountButton = () => {
  const currentPermit = useCurrentParkingPermit()
  const [removeAccount, {isLoading, isError}] =
    useManageVisitorRemoveAccountMutation()
  const onPress = useCallback(() => {
    Alert.alert(
      'Weet u zeker dat u het bezoekersaccount wilt verwijderen?',
      '',
      [
        {
          text: 'Annuleren',
          style: 'cancel',
        },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: () => {
            void removeAccount(currentPermit.report_code)
          },
        },
      ],
      {cancelable: true},
    )
  }, [currentPermit.report_code, removeAccount])

  return (
    <Button
      isError={isError}
      isLoading={isLoading}
      label="Verwijder account"
      onPress={onPress}
      testID="ParkingManageVisitorRemoveAccountButton"
      variant="secondaryDestructive"
    />
  )
}
