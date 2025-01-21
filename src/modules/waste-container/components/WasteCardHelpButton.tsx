import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteContainerRouteName} from '@/modules/waste-container/routes'

export const WasteCardHelpButton = () => {
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    navigate(WasteContainerRouteName.wasteCardHelp)
  }, [navigate])

  return (
    <Button
      label="De container gaat niet open"
      onPress={onPress}
      testID="WasteCardScreenHelpButton"
      variant="secondary"
    />
  )
}
