import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

export const NavigationButtonToWasteCalendar = () => {
  const {navigate} = useNavigation()

  return (
    <NavigationButton
      emphasis="default"
      horizontallyAlign="start"
      iconSize="md"
      insetHorizontal="no"
      insetVertical="no"
      onPress={() => navigate(WasteGuideRouteName.wasteGuideCalendar)}
      testID="WasteGuideWasteGuideCalendarButton"
      title="Bekijk de afvalkalender"
    />
  )
}
