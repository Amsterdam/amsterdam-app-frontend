import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingPermit, ParkingPermitScope} from '@/modules/parking/types'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeBalance = ({permit}: Props) => {
  const parkingAccount = useParkingAccount()

  if (!permit) {
    return null
  }

  const {
    permit_name,
    time_balance,
    parking_rate,
    max_sessions_allowed,
    time_balance_applicable,
    time_valid_until,
  } = permit

  const parkingRate = parking_rate.value
    ? `${formatNumber(parking_rate.value, parking_rate.currency)} per uur`
    : 'Gratis'

  return (
    <Column gutter="xs">
      <Title
        level="h5"
        testID="ParkingPermitDetailNamePhrase"
        text={
          parkingAccount?.scope === ParkingPermitScope.permitHolder
            ? permit_name
            : 'Bezoekersvergunning'
        }
      />
      <Column>
        {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
          <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
            {`Parkeertijd: ${time_balance_applicable ? formatSecondsTimeRangeToDisplay(time_balance, {short: true}) : 'Onbeperkt'}`}
          </Phrase>
        )}

        <Phrase testID="ParkingPermitDetailParkingRatePhrase">
          Uw parkeertarief: {parkingRate}
        </Phrase>
        <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
          Maximaal parkeersessies tegelijk: {max_sessions_allowed}
        </Phrase>
        {!!time_valid_until && (
          <Phrase testID="ParkingPermitBalanceTimeValidUntilPhrase">
            {`Geldig tot ${formatDate(time_valid_until)}`}
          </Phrase>
        )}
      </Column>
    </Column>
  )
}
