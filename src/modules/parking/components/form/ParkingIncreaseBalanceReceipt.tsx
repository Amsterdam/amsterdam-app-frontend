import {useFormContext} from 'react-hook-form'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingReceiptItem} from '@/modules/parking/components/form/ParkingReceiptItem'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingIncreaseBalanceReceipt = () => {
  const {watch} = useFormContext<{amount?: number}>()
  const amount = watch('amount')

  const {data: account, isLoading: isLoadingAccount} = useAccountDetailsQuery()

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
      <ParkingReceiptItem>
        <Phrase>Huidig geldsaldo</Phrase>
        <Phrase>
          {formatNumber(account?.wallet.balance, account?.wallet.currency)}
        </Phrase>
      </ParkingReceiptItem>
      <ParkingReceiptItem>
        <Phrase>Bedrag toevoegen</Phrase>
        <Phrase>
          {amount ? `+ ${formatNumber(amount, account?.wallet.currency)}` : '-'}
        </Phrase>
      </ParkingReceiptItem>
      <Gutter height="md" />
      <SingleSelectable>
        <Row
          align="between"
          flex={1}>
          <Phrase emphasis="strong">Nieuw geldsaldo</Phrase>
          <Phrase emphasis="strong">
            {amount && account
              ? formatNumber(
                  amount + account?.wallet.balance,
                  account?.wallet.currency,
                )
              : '-'}
          </Phrase>
        </Row>
      </SingleSelectable>
    </Column>
  )
}
