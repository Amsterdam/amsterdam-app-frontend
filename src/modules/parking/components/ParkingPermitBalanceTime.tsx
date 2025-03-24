import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {convertMillisecondsToHoursAndMinutes} from '@/modules/parking/utils/convertMillisecondsToHoursAndMinutes'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingPermitBalanceTime = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitBalanceTimePleaseWait" />
  }

  if (!currentPermit?.time_balance_applicable) {
    return null
  }

  const timeBalanceHoursMinutes = convertMillisecondsToHoursAndMinutes(
    currentPermit.time_balance,
  )

  return (
    <Column gutter="xs">
      <Row align="between">
        <Title
          level="h5"
          testID="ParkingPermitBalanceTimeTitlePhrase"
          text="Tijdsaldo"
        />
        <Title
          level="h5"
          testID="ParkingPermitBalanceTimeTitlePhrase"
          text={`${timeBalanceHoursMinutes[0]} uur ${timeBalanceHoursMinutes[1]} min`}
        />
      </Row>
      <Phrase testID="ParkingPermitBalanceTimeValidUntilPhrase">
        {`Tot ${dayjs(currentPermit.time_valid_until).format('D MMMM YYYY')}`}
      </Phrase>
    </Column>
  )
}
