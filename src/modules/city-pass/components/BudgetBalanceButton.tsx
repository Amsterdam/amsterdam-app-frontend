import {Pressable} from '@/components/ui/buttons/Pressable'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import BalanceSvg from '@/modules/city-pass/assets/balance.svg'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {Budget} from '@/modules/city-pass/types'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  budget: Budget
}

export const BudgetBalanceButton = ({budget}: Props) => {
  const {navigate} = useNavigation()
  const {omschrijving, budget_balance} = budget

  return (
    <Pressable
      onPress={() => navigate(CityPassRouteName.budget, {budget})}
      testID="CityPassBalanceButton">
      <Border color="cityPass">
        <Column>
          <Box variant="city-pass">
            <Row
              gutter="md"
              valign="center">
              <BalanceSvg />
              <Column>
                <Phrase
                  color="inverse"
                  emphasis="strong"
                  testID="CityPassBalanceButtonBalanceLabel">
                  {omschrijving}
                </Phrase>
                <Title
                  color="inverse"
                  testID="CityPassBalanceButtonBalanceValue"
                  text={formatNumber(budget_balance, true)}
                />
              </Column>
            </Row>
          </Box>
          <Box
            insetHorizontal="md"
            insetVertical="sm">
            <Row
              align="between"
              valign="center">
              <Phrase
                color="cityPass"
                emphasis="strong"
                testID="CityPassBalanceButtonActionLabel">
                Bekijk betalingen
              </Phrase>
              <Icon
                color="cityPass"
                name="chevron-right"
                size="lg"
                testID="CityPassBalanceButtonNavigationIcon"
              />
            </Row>
          </Box>
        </Column>
      </Border>
    </Pressable>
  )
}
