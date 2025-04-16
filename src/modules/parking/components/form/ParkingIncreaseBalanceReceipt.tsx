import {skipToken} from '@reduxjs/toolkit/query'
import {useContext} from 'react'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {getParkingTimeForMoneyBalance} from '@/modules/parking/utils/getParkingTimeForMoneyBalance'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingIncreaseBalanceReceipt = () => {
  const {amount} = useContext(ParkingSessionContext)

  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()

  const {data: account, isLoading: isLoadingAccount} = useAccountDetailsQuery(
    secureParkingAccount ? secureParkingAccount.accessToken : skipToken,
  )

  const {currentPermit, isLoading: isLoadingPermit} =
    useGetCurrentParkingPermit()

  if (isLoadingPermit || isLoadingSecureParkingAccount || isLoadingAccount) {
    return <PleaseWait testID="ParkingIncreaseBalanceReceiptPleaseWait" />
  }

  if (!currentPermit) {
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
        <Row
          align="between"
          flex={1}>
          <Phrase>Goed voor</Phrase>
          <Phrase>
            {account
              ? getParkingTimeForMoneyBalance(
                  account?.wallet.balance,
                  currentPermit.parking_rate.value,
                )
              : '-'}
          </Phrase>
        </Row>
      </SingleSelectable>
      <Gutter height="md" />
      <SingleSelectable>
        <Row
          align="between"
          flex={1}>
          <Phrase emphasis="strong">Opwaarderen</Phrase>
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
