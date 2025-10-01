import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useCalendarView} from '@/modules/waste-guide/slice'

export const WasteGuideHeaderSideComponent = () => {
  const {calendarView, toggleCalendarView} = useCalendarView()

  return (
    <IconButton
      accessibilityLabel={`Toon ophaaldagen als ${calendarView !== 'list' ? 'lijst' : 'kalender'}`}
      icon={
        <Icon
          color="link"
          name={calendarView === 'list' ? 'grid' : 'list'}
          size="lg"
        />
      }
      onPress={toggleCalendarView}
      testID="WasteGuideToggleCalendarViewButton"
    />
  )
}
