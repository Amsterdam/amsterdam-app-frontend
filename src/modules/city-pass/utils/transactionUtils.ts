import {TransactionItemProps} from '@/modules/city-pass/components/transactions/TransactionItem'
import {
  Transactions,
  TransactionType,
  BudgetTransaction,
} from '@/modules/city-pass/types'
import {formatDate} from '@/utils/datetime/formatDate'

export type TransactionByDate = TransactionItemProps & {
  datePublishedFormatted: string
}

export type TransactionsByDate = {
  data: TransactionByDate[]
  date: string
}

export const getTransactionsByDate = (transactions: TransactionByDate[]) => {
  if (!transactions) {
    return []
  }

  return transactions.reduce((result: TransactionsByDate[], transaction) => {
    const today = formatDate(new Date().toISOString())
    const dateOrToday =
      transaction.datePublishedFormatted === today
        ? 'Vandaag'
        : transaction.datePublishedFormatted
    const section = result.find(s => s.date === dateOrToday)

    if (section) {
      section.data.push(transaction)
    } else {
      result.push({date: dateOrToday, data: [transaction]})
    }

    return result
  }, [] as TransactionsByDate[])
}

const transactionsIsBudget = (
  _transactions: Transactions,
  type: TransactionType,
): _transactions is BudgetTransaction[] => type === TransactionType.budget

export const mapTransactions = (
  transactions: Transactions,
  type: TransactionType,
) => {
  if (transactionsIsBudget(transactions, type)) {
    return transactions.map(transaction => ({
      id: transaction.id,
      accessibilityLabel: transaction.amountFormatted,
      amountFormatted: transaction.amountFormatted,
      datePublishedFormatted: transaction.datePublishedFormatted,
      title: transaction.title,
    }))
  } else {
    return transactions.map(transaction => ({
      id: transaction.id,
      accessibilityLabel: `${transaction.discountAmountFormatted} bespaard.`,
      amountFormatted: transaction.discountAmountFormatted,
      datePublishedFormatted: transaction.datePublishedFormatted,
      description: transaction.description,
      title: transaction.discountTitle,
    }))
  }
}