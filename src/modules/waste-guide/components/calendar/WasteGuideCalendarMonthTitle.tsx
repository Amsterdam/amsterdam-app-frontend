import {View} from 'react-native'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  isFirstOfMonth?: boolean
  monthName?: string
}

export const WasteGuideCalendarMonthTitle = ({
  isFirstOfMonth,
  monthName,
}: Props) => {
  if (!isFirstOfMonth || !monthName) {
    return null
  }

  return (
    <View>
      <Title
        level="h5"
        text={capitalizeString(monthName)}
      />
      <Gutter height="sm" />
    </View>
  )
}
