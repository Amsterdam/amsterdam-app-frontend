import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {Transaction} from '@/modules/city-pass/types'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatNumber} from '@/utils/formatNumber'

const omschrijving = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

const transactions: Transaction[] = [
  {
    id: 1,
    aanbieder: {
      id: 1,
      naam: 'Over het IJ Festival',
    },
    bedrag: 104.95,
    omschrijving,
    transactiedatum: '2024-06-10T04:01:01.0000',
  },
  {
    id: 2,
    aanbieder: {
      id: 2,
      naam: 'Stedelijk Museum Amsterdam',
    },
    bedrag: 22.5,
    omschrijving,
    transactiedatum: '2024-06-10T04:01:01.0000',
  },
  {
    id: 3,
    aanbieder: {
      id: 3,
      naam: 'ARTIS',
    },
    bedrag: 29.95,
    omschrijving,
    transactiedatum: '2024-06-04T04:01:01.0000',
  },
  {
    id: 4,
    aanbieder: {
      id: 4,
      naam: 'NEMO Science Museum',
    },
    bedrag: 27.5,
    omschrijving,
    transactiedatum: '2024-05-22T04:01:01.0000',
  },
  {
    id: 5,
    aanbieder: {
      id: 5,
      naam: 'Eye Filmmuseum',
    },
    bedrag: 11.5,
    omschrijving,
    transactiedatum: '2024-05-22T04:01:01.0000',
  },
  {
    id: 6,
    aanbieder: {
      id: 2,
      naam: 'Stedelijk Museum Amsterdam',
    },
    bedrag: 22.5,
    omschrijving,
    transactiedatum: '2024-05-06T04:01:01.0000',
  },
  {
    id: 7,
    aanbieder: {
      id: 3,
      naam: 'ARTIS',
    },
    bedrag: 29.95,
    omschrijving,
    transactiedatum: '2024-02-16T04:01:01.0000',
  },
]

type TransactionsByDate = {
  data: Transaction[]
  date: string
}

const transactionsByDate = transactions?.reduce(
  (result: TransactionsByDate[], transaction) => {
    const date = formatDate(transaction.transactiedatum)
    const section = result.find(s => s.date === date)

    if (section) {
      section.data.push(transaction)
    } else {
      result.push({date, data: [transaction]})
    }

    return result
  },
  [] as TransactionsByDate[],
)

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

const TransactionItem = ({transaction}: {transaction: Transaction}) => (
  <Column>
    <Row align="between">
      <Phrase
        emphasis="strong"
        testID="">
        {transaction.aanbieder.naam}
      </Phrase>
      <Phrase
        emphasis="strong"
        testID="">
        {formatNumber(transaction.bedrag, true)}
      </Phrase>
    </Row>
    {!!transaction.omschrijving && (
      <Paragraph>{transaction.omschrijving}</Paragraph>
    )}
  </Column>
)

export const TransactionHistory = () => (
  <Column gutter="md">
    <Title text="Mijn acties" />
    <Paragraph>
      {`In in totaal heb je ${formatNumber(103.95, true)} bespaard. Deze informatie kan 1 dag achterlopen.`}
    </Paragraph>
    <Border bottom>
      <Box insetBottom="sm">
        <SingleSelectable
          accessibilityLabel="Hieronder volgt een overzicht van jouw acties"
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
              Besparing
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
