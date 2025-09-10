import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {CityOffice} from '@/modules/contact/types'
import {getUpcomingExceptionDescriptions} from '@/modules/contact/utils/getUpcomingExceptionDescriptions'

type Props = {
  visitingHoursExceptions: CityOffice['visitingHours']['exceptions']
}

export const VisitingHoursExceptions = ({visitingHoursExceptions}: Props) => {
  const items = getUpcomingExceptionDescriptions(visitingHoursExceptions)

  if (!items.length) {
    return null
  }

  return (
    <Column gutter="md">
      <Title
        level="h3"
        testID="ContactVisitingHoursExceptionTitle"
        text="Aangepaste openingstijden"
      />
      <List
        items={items}
        testID="ContactVisitingHoursGroupedList"
      />
    </Column>
  )
}
