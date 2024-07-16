import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'

export const BalanceScreen = () => {
  useSetScreenTitle('Ryan')

  return (
    <CityPassLoginBoundaryScreen testID="CityPassBalanceScreen">
      <Box>
        <Column gutter="lg">
          <Title
            testID="CityPassBalanceTitleLabel"
            text="Kindtegoed"
          />
          <Title
            testID="CityPassBalanceTitleValue"
            text="€ 86,34"
          />
          <Column>
            <Paragraph>Was in het begin € 125,00.</Paragraph>
            <Paragraph>Geldig tot en met 31 juli 2024.</Paragraph>
          </Column>
        </Column>
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
