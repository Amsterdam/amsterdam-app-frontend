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
      {datePublishedFormatted: today},
      {datePublishedFormatted: '2022-01-01'},
      {datePublishedFormatted: today},
      {datePublishedFormatted: '2022-01-02'},
    ] as TransactionByDate[]

    const result = getTransactionsByDate(transactions)

    expect(result).toEqual([
      {date: 'Vandaag', data: [transactions[0], transactions[2]]},
      {date: '2022-01-01', data: [transactions[1]]},
      {date: '2022-01-02', data: [transactions[3]]},
    ])
  })
})
