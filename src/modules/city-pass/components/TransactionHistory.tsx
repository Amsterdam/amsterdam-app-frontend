import {useMemo} from 'react'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {TransactionItem} from '@/modules/city-pass/components/TransactionItem'
import {Transactions, TransactionType} from '@/modules/city-pass/types'
import {
  getTransactionsByDate,
  mapTransactions,
} from '@/modules/city-pass/utils/transactionUtils'

const NoTransactions = () => (
  <Border bottom>
    <Box insetBottom="md">
      <Phrase
        color="secondary"
        testID="CityPassTransactionHistoryNoTransactions">
        Geen acties
      </Phrase>
    </Box>
  </Border>
)

type Props = {
  transactions: Transactions
  type: TransactionType
}

export const TransactionHistory = ({transactions, type}: Props) => {
  const transactionsByDate = useMemo(
    () => getTransactionsByDate(mapTransactions(transactions, type)),
    [transactions, type],
  )

  return (
    <Column gutter="md">
      <Border bottom>
        <Box insetBottom="sm">
          <SingleSelectable
            accessibilityLabel={`Hieronder volgt een overzicht van jouw ${type === 'discount' ? 'acties en het bedrag dat je bespaard hebt.' : 'betalingen en het bedrag dat je hebt uitgegeven.'}`}
            accessibilityRole="header"
            testID="CityPassTransactionHistoryTableHeader">
            <Row align="between">
              <Phrase
                emphasis="strong"
                testID="CityPassTransactionHistoryTableHeaderDescription">
                Omschrijving
              </Phrase>
              <Phrase
                emphasis="strong"
                testID="CityPassTransactionHistoryTableHeaderValue">
                {type === 'discount' ? 'Besparing' : 'Bedrag'}
              </Phrase>
            </Row>
          </SingleSelectable>
        </Box>
      </Border>
      {transactionsByDate.length ? (
        transactionsByDate.map(dateGroup => (
          <Border
            bottom
            key={dateGroup.date}>
            <Box insetBottom="lg">
              <SingleSelectable>
                <Column gutter="sm">
                  <Phrase
                    color="secondary"
                    testID="CityPassTransactionHistoryDate">
                    {dateGroup.date}
                  </Phrase>
                  {dateGroup.data.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      {...transaction}
                    />
                  ))}
                </Column>
              </SingleSelectable>
            </Box>
          </Border>
        ))
      ) : (
        <NoTransactions />
      )}
    </Column>
  )
}
