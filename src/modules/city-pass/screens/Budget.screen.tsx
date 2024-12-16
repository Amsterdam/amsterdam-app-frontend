import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Budget} from '@/modules/city-pass/components/Budget'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = NavigationProps<CityPassRouteName.budget>

export const BudgetScreen = ({route}: Props) => {
  const {
    params: {budgetCode, passNumber},
  } = route

  return (
    <Screen testID="CityPassBalanceScreen">
      <Budget
        budgetCode={budgetCode}
        passNumber={passNumber}
      />
    </Screen>
  )
}
