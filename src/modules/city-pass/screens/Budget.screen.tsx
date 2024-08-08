import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {TransactionHistory} from '@/modules/city-pass/components/TransactionHistory'
import {budgetTransactions} from '@/modules/city-pass/mocks/budgetTransactions'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const BudgetScreen = () => {
  const {
    params: {
      budget: {
        budgetBalanceFormatted,
        budgetAssignedFormatted,
        dateEndFormatted,
        title,
      },
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
            text={title}
          />
          <Title
            testID="CityPassBalanceTitleValue"
            text={budgetBalanceFormatted}
          />
          <Column halign="center">
            <Paragraph>{`Was in het begin ${budgetAssignedFormatted}.`}</Paragraph>
            <Paragraph>{`Geldig tot en met ${dateEndFormatted}.`}</Paragraph>
          </Column>
          <TransactionHistory
            transactions={budgetTransactions}
            type="budget"
          />
        </Column>
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
