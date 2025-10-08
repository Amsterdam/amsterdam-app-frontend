import {useCallback, useEffect, useState} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useManageVisitorRemoveAccountMutation} from '@/modules/parking/service'

export const ManageVisitorRemoveAccountButton = () => {
  const currentPermit = useCurrentParkingPermit()
  const [removeAccount, {isError}] = useManageVisitorRemoveAccountMutation()
  const [isPressed, setIsPressed] = useState(false)
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
            setIsPressed(true)
            void removeAccount(currentPermit.report_code)
          },
        },
      ],
      {cancelable: true},
    )
  }, [currentPermit.report_code, removeAccount])

  useEffect(() => {
    if (isError) {
      setIsPressed(false)
    }
  }, [isError])

  return (
    <Button
      isError={isError}
      isLoading={!!isPressed && !!currentPermit.visitor_account}
      label="Verwijder account"
      onPress={onPress}
      testID="ParkingManageVisitorRemoveAccountButton"
      variant="secondaryDestructive"
    />
  )
}
