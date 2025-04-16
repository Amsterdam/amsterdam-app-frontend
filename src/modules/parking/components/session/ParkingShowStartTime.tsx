import {useFormContext} from 'react-hook-form'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingShowStartTime = () => {
  const {watch} = useFormContext<{
    startTime: Dayjs
  }>()
  const startTime = watch('startTime')

  const timeString = formatDateTimeToDisplay(startTime, false)

  return (
    <Column>
      <Title
        level="h5"
        text="Starttijd"
      />
      <Paragraph>{timeString}</Paragraph>
    </Column>
  )
}
