import {IconButton} from '@/components/ui/buttons/IconButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

type Props = {
  dayEvents: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarDayEvents = ({dayEvents}: Props) => {
  const {navigate} = useNavigation()

  if (dayEvents?.length === 0) {
    return null
  }

  return (
    <Column gutter="sm">
      {dayEvents.map(({code}, idx) => (
        <IconButton
          icon={<WasteFractionIcon fractionCode={code} />}
          key={idx}
          onPress={() =>
            navigate(WasteGuideRouteName.wasteGuideFraction, {
              fractionCode: code,
            })
          }
          testID="WasteFractionIconCalendarButton"
        />
      ))}
    </Column>
  )
}
