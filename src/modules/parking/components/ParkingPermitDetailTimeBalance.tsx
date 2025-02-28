import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingPermit} from '@/modules/parking/types'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeBalance = ({permit}: Props) => {
  if (!permit) {
    return null
  }

  const {permit_name, time_balance, parking_rate} = permit
  const timeBalance = time_balance ? `${time_balance} uur` : 'Onbeperkt'
  const parkingRate = parking_rate.value
    ? `${formatNumber(parking_rate.value, true)} per uur`
    : 'Gratis'

  return (
    <Column gutter="xs">
      <Phrase
        emphasis="strong"
        testID="ParkingPermitDetailNamePhrase">
        {permit_name}
      </Phrase>
      <Column>
        <Phrase testID="ParkingPermitDetailTimeBalancePhrase">
          {`Parkeertijd: ${timeBalance}`}
        </Phrase>
        <Phrase testID="ParkingPermitDetailParkingRatePhrase">
          {`Parkeertarief: ${parkingRate}`}
        </Phrase>
      </Column>
    </Column>
  )
}
