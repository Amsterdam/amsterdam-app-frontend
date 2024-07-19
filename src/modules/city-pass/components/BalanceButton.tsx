import {Pressable} from '@/components/ui/buttons/Pressable'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import BalanceSvg from '@/modules/city-pass/assets/balance.svg'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const BalanceButton = () => {
  const {navigate} = useNavigation()

  return (
    <Pressable
      onPress={() => navigate(CityPassRouteName.balance)}
      testID="CityPassBalanceButton">
      <Border color="cityPass">
        <Column>
          <Box variant="city-pass">
            <Row
              gutter="md"
              valign="center">
              <BalanceSvg />
              <SingleSelectable>
                <Column>
                  <Phrase
                    color="inverse"
                    testID="CityPassBalanceButtonBalanceLabel">
                    Saldo Kindtegoed
                  </Phrase>
                  <Title
                    color="inverse"
                    testID="CityPassBalanceButtonBalanceValue"
                    text="€ 86,43"
                  />
                </Column>
              </SingleSelectable>
            </Row>
          </Box>
          <Box>
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
