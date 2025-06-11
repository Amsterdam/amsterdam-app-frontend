import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermitBalanceMoney} from '@/modules/parking/components/dashboard/ParkingPermitBalanceMoney'
import {ParkingPermitBalanceTime} from '@/modules/parking/components/dashboard/ParkingPermitBalanceTime'
import {ParkingPermitTariff} from '@/modules/parking/components/dashboard/ParkingPermitTariff'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitBalance = () => {
  const currentPermit = useCurrentParkingPermit()

  const {parkingAccount} = useParkingAccount()

  if (
    !currentPermit.time_balance_applicable &&
    !currentPermit.money_balance_applicable
  ) {
    return null
  }

  if (parkingAccount?.scope === ParkingPermitScope.visitor) {
    return (
      <Column>
        <Title
          level="h2"
          text="Tijd en kosten"
        />
        <Gutter height="md" />
        <ParkingPermitBalanceTime />
        <ParkingPermitTariff />
      </Column>
    )
  }

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text="Uw saldo"
      />
      <ParkingPermitBalanceTime />
      <ParkingPermitBalanceMoney />
    </Column>
  )
}
