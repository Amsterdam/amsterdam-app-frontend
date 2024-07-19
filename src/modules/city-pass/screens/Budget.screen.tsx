import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {TransactionHistory} from '@/modules/city-pass/components/TransactionHistory'
import {transactions} from '@/modules/city-pass/mocks/transactions'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatNumber} from '@/utils/formatNumber'

export const BudgetScreen = () => {
  const {
    params: {
      budget: {budget_assigned, budget_balance, expiry_date, omschrijving},
    },
  } = useRoute<CityPassRouteName.budget>()

  useSetScreenTitle('Ryan')

  return (
    <CityPassLoginBoundaryScreen testID="CityPassBalanceScreen">
      <Box>
        <Column
          gutter="lg"
          halign="center">
          <Title
            testID="CityPassBalanceTitleLabel"
            text={omschrijving}
          />
          <Title
            testID="CityPassBalanceTitleValue"
            text={formatNumber(budget_balance, true)}
          />
          <Column halign="center">
            <Paragraph>{`Was in het begin ${formatNumber(budget_assigned, true)}.`}</Paragraph>
            <Paragraph>{`Geldig tot en met ${formatDate(expiry_date)}.`}</Paragraph>
          </Column>
          <TransactionHistory
            transactions={transactions.transacties}
            type="budget"
          />
        </Column>
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
