import {useFormContext} from 'react-hook-form'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

type Props = {
  fieldName?: string
}

export const ParkingShowStartTime = ({fieldName = 'startTime'}: Props) => {
  const {watch} = useFormContext<Record<string, Dayjs>>()
  const fieldTime = watch(fieldName)

  const timeString = formatDateTimeToDisplay(fieldTime, false)

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
