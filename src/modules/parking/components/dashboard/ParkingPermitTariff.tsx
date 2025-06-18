import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingPermitTariff = () => {
  const currentPermit = useCurrentParkingPermit()

  if (!currentPermit.money_balance_applicable) {
    return null
  }

  const {
    parking_rate: {value, currency},
  } = currentPermit

  return (
    <SingleSelectable>
      <Row align="between">
        <Phrase testID="ParkingPermitBalanceMoneyTitlePhrase">
          Parkeertarief
        </Phrase>
        <Title
          level="h5"
          testID="ParkingPermitBalanceMoneyTitlePhrase"
          text={formatNumber(value, currency)}
        />
      </Row>
    </SingleSelectable>
  )
}
