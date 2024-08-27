import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {BudgetTransactions} from '@/modules/city-pass/components/BudgetTransactions'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const BudgetScreen = () => {
  const {
    params: {
      budget: {
        budgetBalanceFormatted,
        budgetAssignedFormatted,
        code,
        dateEnd,
        dateEndFormatted,
        title,
      },
      firstname,
      passNumber,
    },
  } = useRoute<CityPassRouteName.budget>()

  useSetScreenTitle(firstname)

  return (
    <CityPassLoginBoundaryScreen testID="CityPassBalanceScreen">
      <Box>
        <Column gutter="lg">
          <Column
            gutter="md"
            halign="center">
            <Title
              testID="CityPassBalanceTitleLabel"
              text={title}
              textAlign="center"
            />
            <Title
              testID="CityPassBalanceTitleValue"
              text={budgetBalanceFormatted}
            />
            <Column halign="center">
              <Paragraph>{`Was in het begin ${budgetAssignedFormatted}.`}</Paragraph>
              <Paragraph>{`Geldig tot en met ${dateEndFormatted}.`}</Paragraph>
            </Column>
          </Column>
          <BudgetTransactions
            budgetCode={code}
            dateEnd={dateEnd}
            passNumber={passNumber}
          />
        </Column>
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
