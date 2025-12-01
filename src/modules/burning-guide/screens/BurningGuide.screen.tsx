import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectAddress} from '@/modules/address/slice'
import {BurningGuideAddressSwitcher} from '@/modules/burning-guide/components/BurningGuideAddressSwitcher'
import {BurningGuideForecastList} from '@/modules/burning-guide/components/BurningGuideForecastList'
import {BurningGuideNoAddressSection} from '@/modules/burning-guide/components/BurningGuideNoAddressSection'
import {BurningGuideRecommendation} from '@/modules/burning-guide/components/BurningGuideRecommendation'
import {BurningGuideRisksButton} from '@/modules/burning-guide/components/BurningGuideRisksButton'
import {BurningGuideTipsButton} from '@/modules/burning-guide/components/BurningGuideTipsButton'
import {BurningGuideCodeVariant} from '@/modules/burning-guide/types'

export const BurningGuideScreen = () => {
  const address = useSelector(selectAddress)

  // Fetch data

  return (
    <Screen testID="BurningGuideScreen">
      <Column gutter="lg">
        <Box>
          <Column gutter="xl">
            <BurningGuideAddressSwitcher />
            {!address && <BurningGuideNoAddressSection />}
            {!!address && (
              <>
                <BurningGuideRecommendation
                  variant={BurningGuideCodeVariant.red}
                />
                <BurningGuideForecastList
                  list={[
                    {
                      id: '123',
                      isFixed: true,
                      timeWindow: 'Dinsdag 16:00 uur',
                      variant: BurningGuideCodeVariant.red,
                    },
                    {
                      id: '234',
                      isFixed: true,
                      timeWindow: 'Dinsdag 22:00 uur',
                      variant: BurningGuideCodeVariant.red,
                    },
                    {
                      id: '345',
                      isFixed: false,
                      timeWindow: 'Woensdag 04:00 uur',
                      variant: BurningGuideCodeVariant.orange,
                    },
                    {
                      id: '456',
                      isFixed: false,
                      timeWindow: 'Woensdag 10:00 uur',
                      variant: BurningGuideCodeVariant.yellow,
                    },
                  ]}
                />
              </>
            )}
          </Column>
        </Box>
        <Column gutter="md">
          <BurningGuideRisksButton />
          <BurningGuideTipsButton />
          <BurningGuideTipsButton />
        </Column>
      </Column>
    </Screen>
  )
}
