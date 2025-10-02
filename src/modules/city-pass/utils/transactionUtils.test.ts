import {
  getTransactionsByDate,
  TransactionByDate,
} from '@/modules/city-pass/utils/transactionUtils'
import {formatDate} from '@/utils/datetime/formatDate'

describe('getTransactionsByDate', () => {
  it('should handle an empty array', () => {
    const result = getTransactionsByDate([])

    expect(result).toEqual([])
  })

  it('should handle null or undefined input', () => {
    const result = getTransactionsByDate(null as unknown as TransactionByDate[])

    expect(result).toEqual([])

    const result2 = getTransactionsByDate(
      undefined as unknown as TransactionByDate[],
    )

    expect(result2).toEqual([])
  })

  it('should group transactions by date', () => {
    const today = formatDate(new Date().toISOString())
    const transactions = [
      {
        datePublishedFormatted: '09 September 2024',
        datePublished: '2024-09-09T11:03:03.000Z',
        id: '1',
        title: 'Transaction 1',
      },
      {
        datePublishedFormatted: '09 September 2024',
        datePublished: '2024-09-09T11:03:03.000Z',
        id: '2',
        title: 'Transaction 2',
      },
      {
        datePublishedFormatted: today,
        datePublished: new Date().toISOString(),
        id: '3',
        title: 'Transaction 3',
      },
      {
        datePublishedFormatted: '04 September 2024',
        datePublished: '2024-09-04T11:07:53.000Z',
        id: '4',
        title: 'Transaction 4',
      },
    ] as TransactionByDate[]

    const result = getTransactionsByDate(transactions)

    expect(result).toEqual([
      {date: 'Vandaag', data: [transactions[2]]},
      {date: '09 September 2024', data: [transactions[0], transactions[1]]},
      {date: '04 September 2024', data: [transactions[3]]},
    ])
  })

  it('should sort and group unordered transactions', () => {
    const transactions = [
      {
        datePublishedFormatted: '09 September 2024',
        datePublished: '2024-09-09T11:03:03.000Z',
        id: '1',
        title: 'Transaction 1',
      },
      {
        datePublishedFormatted: '04 September 2024',
        datePublished: '2024-09-04T11:07:53.000Z',
        id: '2',
        title: 'Transaction 2',
      },
      {
        datePublishedFormatted: '09 September 2024',
        datePublished: '2024-09-09T11:03:03.000Z',
        id: '3',
        title: 'Transaction 3',
      },
    ] as TransactionByDate[]

    const result = getTransactionsByDate(transactions)

    expect(result).toEqual([
      {
        date: '09 September 2024',
        data: [transactions[0], transactions[2]],
      },
      {
        date: '04 September 2024',
        data: [transactions[1]],
      },
    ])
  })

  it('should group transactions with duplicate dates', () => {
    const transactions = [
      {
        datePublishedFormatted: '01 October 2025',
        datePublished: '2025-10-01T10:00:00.000Z',
        id: '1',
        title: 'A',
      },
      {
        datePublishedFormatted: '01 October 2025',
        datePublished: '2025-10-01T09:00:00.000Z',
        id: '2',
        title: 'B',
      },
    ] as TransactionByDate[]
    const result = getTransactionsByDate(transactions)

    expect(result).toEqual([
      {
        date: '01 October 2025',
        data: [transactions[0], transactions[1]],
      },
    ])
  })
})
