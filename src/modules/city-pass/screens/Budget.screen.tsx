import {useRoute} from '@/hooks/navigation/useRoute'
import {Budget} from '@/modules/city-pass/components/Budget'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const BudgetScreen = () => {
  const {
    params: {budgetCode, passNumber},
  } = useRoute<CityPassRouteName.budget>()

  return (
    <CityPassLoginBoundaryScreen testID="CityPassBalanceScreen">
      <Budget
        budgetCode={budgetCode}
        passNumber={passNumber}
      />
    </CityPassLoginBoundaryScreen>
  )
}
