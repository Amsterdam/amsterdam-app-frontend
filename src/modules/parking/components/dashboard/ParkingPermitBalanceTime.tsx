import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

export const ParkingPermitBalanceTime = () => {
  const currentPermit = useCurrentParkingPermit()
  const accountType = useSelector(selectCurrentAccountType)

  if (!currentPermit.time_balance_applicable) {
    return null
  }

  return (
    <Column gutter="xs">
      <Row align="between">
        {accountType === ParkingPermitScope.permitHolder ? (
          <Title
            level="h5"
            testID="ParkingPermitBalanceTimeTitlePhrase"
            text="Tijdsaldo"
          />
        ) : (
          <Phrase testID="ParkingPermitBalanceTimeTitlePhrase">
            Tijdsaldo
          </Phrase>
        )}
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
      {accountType === ParkingPermitScope.permitHolder && (
        <Phrase testID="ParkingPermitBalanceTimeValidUntilPhrase">
          {`Tot ${formatDate(currentPermit.time_valid_until)}`}
        </Phrase>
      )}
    </Column>
  )
}
