import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useSelector} from '@/hooks/redux/useSelector'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {selectAddress} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {BurningGuideForecastList} from '@/modules/burning-guide/components/BurningGuideForecastList'
import {BurningGuideRecommendation} from '@/modules/burning-guide/components/BurningGuideRecommendation'
import {BurningGuideRisksButton} from '@/modules/burning-guide/components/BurningGuideRisksButton'
import {BurningGuideTipsButton} from '@/modules/burning-guide/components/BurningGuideTipsButton'
import {BurningGuideCodeVariant} from '@/modules/burning-guide/types'

export const BurningGuideScreen = () => {
  const address = useSelector(selectAddress)

  // Fetch data

  return (
    <Screen
      bottomSheet={
        <BottomSheet testID="SelectLocationTypeBottomSheet">
          <SelectLocationTypeBottomSheetContent
            highAccuracyPurposeKey={
              HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
            }
          />
        </BottomSheet>
      }
      testID="BurningGuideScreen">
      <Column gutter="lg">
        <Box>
          <Column gutter="xl">
            <Column gutter="sm">
              <ShareLocationTopTaskButton testID="WasteGuideRequestLocationButton" />
              {!address && (
                <Paragraph testID="BurningGuideScreenText">
                  Voer een adres in om uw stookwijzer informatie te bekijken.
                </Paragraph>
              )}
            </Column>
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
      </Column>
      <Column gutter="md">
        <BurningGuideRisksButton />
        <BurningGuideTipsButton />
        <BurningGuideTipsButton />
      </Column>
    </Screen>
  )
}
