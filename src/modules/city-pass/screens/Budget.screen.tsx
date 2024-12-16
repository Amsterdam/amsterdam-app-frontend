import {Screen} from '@/components/features/screen/Screen'
import {useRoute} from '@/hooks/navigation/useRoute'
import {Budget} from '@/modules/city-pass/components/Budget'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const BudgetScreen = () => {
  const {
    params: {budgetCode, passNumber},
  } = useRoute<CityPassRouteName.budget>()

  return (
    <Screen testID="CityPassBalanceScreen">
      <Budget
        budgetCode={budgetCode}
        passNumber={passNumber}
      />
    </Screen>
  )
}
