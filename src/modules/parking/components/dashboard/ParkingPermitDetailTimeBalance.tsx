import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingPermit, ParkingPermitScope} from '@/modules/parking/types'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeBalance = ({permit}: Props) => {
  const {parkingAccount} = useParkingAccount()

  if (!permit) {
    return null
  }

  const {parking_rate, max_sessions_allowed, time_balance_applicable} = permit

  const parkingRate = parking_rate.value
    ? `${formatNumber(parking_rate.value, parking_rate.currency)} per uur`
    : 'Gratis'

  return (
    <Column gutter="xs">
      <Title
        level="h5"
        testID="ParkingPermitDetailNamePhrase"
        text="Tarief"
      />
      <Column>
        {!time_balance_applicable && (
          <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
            Parkeertijd: Onbeperkt
          </Phrase>
        )}
        <Phrase testID="ParkingPermitDetailParkingRatePhrase">
          Parkeertarief: {parkingRate}
        </Phrase>
        {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
          <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
            Maximaal aantal parkeersessies tegelijk: {max_sessions_allowed}
          </Phrase>
        )}
      </Column>
    </Column>
  )
}
