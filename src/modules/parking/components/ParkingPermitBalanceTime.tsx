import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

export const ParkingPermitBalanceTime = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitBalanceTimePleaseWait" />
  }

  if (!currentPermit?.time_balance_applicable) {
    return null
  }

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
          text={formatTimeDurationToDisplay(
            currentPermit.time_balance,
            'seconds',
            {short: true},
          )}
        />
      </Row>
      <Phrase testID="ParkingPermitBalanceTimeValidUntilPhrase">
        {`Tot ${formatDate(currentPermit.time_valid_until)}`}
      </Phrase>
    </Column>
  )
}
