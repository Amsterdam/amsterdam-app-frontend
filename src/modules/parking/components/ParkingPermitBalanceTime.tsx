import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {convertMillisecondsToHoursAndMinutes} from '@/modules/parking/utils/convertMillisecondsToHoursAndMinutes'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingPermitBalanceTime = () => {
  const {currentPermit, isLoading} = useGetCurrentPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitBalanceTimePleaseWait" />
  }

  if (!currentPermit || !currentPermit.time_balance_applicable) {
    return null
  }

  const timeBalanceHoursMinutes = convertMillisecondsToHoursAndMinutes(
    currentPermit.time_balance,
  )

  return (
    <Column gutter="xs">
      <Row
        align="between"
        valign="center">
        <Phrase
          emphasis="strong"
          testID="ParkingPermitBalanceTimeTitlePhrase">
          Tijdsaldo
        </Phrase>
        <Phrase
          emphasis="strong"
          testID="ParkingPermitBalanceTimeTitlePhrase">
          {`${timeBalanceHoursMinutes[0]} uur ${timeBalanceHoursMinutes[1]} min`}
        </Phrase>
      </Row>
      <Phrase testID="ParkingPermitBalanceTimeValidUntilPhrase">
        {`Tot ${dayjs(currentPermit.time_valid_until).format('D MMMM YYYY')}`}
      </Phrase>
    </Column>
  )
}
