import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermit} from '@/modules/parking/types'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeBalance = ({permit}: Props) => {
  if (!permit) {
    return null
  }

  const {permit_name, time_balance, parking_rate, max_sessions_allowed} = permit
  const timeBalance = time_balance
    ? formatTimeDurationToDisplay(time_balance, 'seconds', {short: true})
    : 'Onbeperkt'
  const parkingRate = parking_rate.value
    ? `${formatNumber(parking_rate.value, parking_rate.currency)} per uur`
    : 'Gratis'

  return (
    <Column gutter="xs">
      <Title
        level="h5"
        testID="ParkingPermitDetailNamePhrase"
        text={permit_name}
      />
      <Column>
        <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
          Parkeertijd: {timeBalance}
        </Phrase>
        <Phrase testID="ParkingPermitDetailParkingRatePhrase">
          Parkeertarief: {parkingRate}
        </Phrase>
        <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
          Maximaal aantal parkeersessies tegelijk: {max_sessions_allowed}
        </Phrase>
      </Column>
    </Column>
  )
}
