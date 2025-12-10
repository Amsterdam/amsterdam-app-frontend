import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

type Props = {
  isFetchingAddress?: boolean
  isFetchingWasteGuide: boolean
}

export const WasteGuideNoAddress = ({
  isFetchingWasteGuide,
  isFetchingAddress,
}: Props) => (
  <Column
    grow={1}
    gutter="xl">
    <HorizontalSafeArea flex={1}>
      <Box grow>
        <Column
          flex={1}
          gutter="lg">
          <Column gutter="md">
            {!isFetchingWasteGuide && !isFetchingAddress && (
              <Title text="Voor welke locatie wilt u informatie over afval?" />
            )}
            <ShareLocationTopTaskButton
              highAccuracyPurposeKey={
                HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
              }
              testID="WasteGuideRequestLocationButton"
            />
          </Column>
          {!!isFetchingWasteGuide && (
            <PleaseWait testID="WasteGuideLoadingSpinner" />
          )}
        </Column>
      </Box>
    </HorizontalSafeArea>
  </Column>
)
