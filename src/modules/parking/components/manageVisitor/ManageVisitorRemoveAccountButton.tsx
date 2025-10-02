import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'

export const ManageVisitorRemoveAccountButton = () => {
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
            // handle remove
          },
        },
      ],
      {cancelable: true},
    )
  }, [])

  return (
    <Button
      label="Verwijder account"
      onPress={onPress}
      testID="ParkingManageVisitorRemoveAccountButton"
      variant="secondaryDestructive"
    />
  )
}
