import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermit} from '@/modules/parking/types'
import {convertMillisecondsToHoursAndMinutes} from '@/modules/parking/utils/convertMillisecondsToHoursAndMinutes'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeBalance = ({permit}: Props) => {
  if (!permit) {
    return null
  }

  const {permit_name, time_balance, parking_rate} = permit
  const timeBalanceHoursMinutes =
    convertMillisecondsToHoursAndMinutes(time_balance)
  const timeBalance = time_balance
    ? `${timeBalanceHoursMinutes[0]} uur ${timeBalanceHoursMinutes[1]} min`
    : 'Onbeperkt'
  const parkingRate = parking_rate.value
    ? `${formatNumber(parking_rate.value, true)} per uur`
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
          {`Parkeertijd: ${timeBalance}`}
        </Phrase>
        <Phrase testID="ParkingPermitDetailParkingRatePhrase">
          {`Parkeertarief: ${parkingRate}`}
        </Phrase>
      </Column>
    </Column>
  )
}
