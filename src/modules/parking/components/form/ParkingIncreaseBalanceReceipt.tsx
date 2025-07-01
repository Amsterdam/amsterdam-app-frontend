import {useFormContext} from 'react-hook-form'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {getParkingTimeForMoneyBalance} from '@/modules/parking/utils/getParkingTimeForMoneyBalance'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingIncreaseBalanceReceipt = () => {
  const {watch} = useFormContext<{amount?: number}>()
  const amount = watch('amount')

  const {data: account, isLoading: isLoadingAccount} = useAccountDetailsQuery()

  const currentPermit = useCurrentParkingPermit()

  if (isLoadingAccount) {
    return <PleaseWait testID="ParkingIncreaseBalanceReceiptPleaseWait" />
  }

  if (!account?.wallet) {
    return (
      <SomethingWentWrong testID="ParkingIncreaseBalanceReceiptSomethingWentWrong" />
    )
  }

  return (
    <Column>
      <SingleSelectable>
        <Row
          align="between"
          flex={1}>
          <Phrase emphasis="strong">Huidig geldsaldo</Phrase>
          <Phrase emphasis="strong">
            {formatNumber(account?.wallet.balance, account?.wallet.currency)}
          </Phrase>
        </Row>
      </SingleSelectable>
      <SingleSelectable>
        <Row
          align="between"
          flex={1}>
          <Phrase emphasis="strong">Bedrag toevoegen</Phrase>
          <Phrase emphasis="strong">
            {amount
              ? `+ ${formatNumber(amount, account?.wallet.currency)}`
              : '-'}
          </Phrase>
        </Row>
      </SingleSelectable>
      <Gutter height="md" />
      <SingleSelectable>
        <Row
          align="between"
          flex={1}>
          <Phrase
            emphasis="strong"
            variant="intro">
            Nieuw geldsaldo
          </Phrase>
          <Phrase
            emphasis="strong"
            variant="intro">
            {amount && account
              ? formatNumber(
                  amount + account?.wallet.balance,
                  account?.wallet.currency,
                )
              : '-'}
          </Phrase>
        </Row>
        <Row
          align="between"
          flex={1}>
          <Phrase>Goed voor</Phrase>
          <Phrase>
            {account && amount
              ? getParkingTimeForMoneyBalance(
                  account?.wallet.balance + amount,
                  currentPermit.parking_rate.value,
                )
              : '-'}
          </Phrase>
        </Row>
      </SingleSelectable>
    </Column>
  )
}
