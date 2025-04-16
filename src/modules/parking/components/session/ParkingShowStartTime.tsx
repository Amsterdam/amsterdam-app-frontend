import {useContext} from 'react'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingShowStartTime = () => {
  const {startTime} = useContext(ParkingSessionContext)

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
