import {useMemo} from 'react'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {TransactionOld} from '@/modules/city-pass/types'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatNumber} from '@/utils/formatNumber'

type TransactionsByDate = {
  data: TransactionOld[]
  date: string
}

const getTransactionsByDate = (transactions: TransactionOld[]) =>
  transactions.reduce((result: TransactionsByDate[], transaction) => {
    const date = formatDate(transaction.transactiedatum)
    const today = formatDate(new Date().toISOString())
    const dateOrToday = date === today ? 'Vandaag' : date
    const section = result.find(s => s.date === dateOrToday)

    if (section) {
      section.data.push(transaction)
    } else {
      result.push({date: dateOrToday, data: [transaction]})
    }

    return result
  }, [] as TransactionsByDate[])

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

type TransactionItemProps = {
  transaction: TransactionOld
  type: Props['type']
}

const TransactionItem = ({
  transaction: {aanbieder, bedrag, budget, omschrijving},
  type,
}: TransactionItemProps) => (
  <Column>
    <Row align="between">
      <Phrase
        emphasis="strong"
        testID="">
        {budget?.aanbieder?.naam ?? aanbieder?.naam}
      </Phrase>
      <Phrase
        accessibilityLabel={
          type === 'savings'
            ? `${formatNumber(bedrag, true)} bespaard.`
            : formatNumber(bedrag, true)
        }
        emphasis="strong"
        testID="">
        {formatNumber(bedrag, true)}
      </Phrase>
    </Row>
    {!!omschrijving && <Paragraph>{omschrijving}</Paragraph>}
  </Column>
)

type Props = {
  transactions: TransactionOld[]
  type: 'budget' | 'savings'
}

export const TransactionHistory = ({transactions, type}: Props) => {
  const transactionsByDate = useMemo(
    () => getTransactionsByDate(transactions),
    [transactions],
  )

  return (
    <Column gutter="md">
      {type === 'savings' ? (
        <>
          <Title text="Mijn acties" />
          <Paragraph>
            {`In in totaal heb je ${formatNumber(103.95, true)} bespaard. Deze informatie kan 1 dag achterlopen.`}
          </Paragraph>
        </>
      ) : (
        <>
          <Title text="Betalingen" />
          <Paragraph>
            Deze informatie kan 1 dag achterlopen. Het saldo dat je nog over
            hebt klopt altijd.
          </Paragraph>
        </>
      )}
      <Border bottom>
        <Box insetBottom="sm">
          <SingleSelectable
            accessibilityLabel={`Hieronder volgt een overzicht van jouw ${type === 'savings' ? 'acties en het bedrag dat je bespaard hebt.' : 'betalingen en het bedrag dat je hebt uitgegeven.'}`}
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
                {type === 'savings' ? 'Besparing' : 'Bedrag'}
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
                    testID="">
                    {dateGroup.date}
                  </Phrase>
                  {dateGroup.data.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      type={type}
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
      <Paragraph textAlign="center">
        Dit waren jouw acties vanaf 1 augustus 2023{' '}
      </Paragraph>
    </Column>
  )
}
