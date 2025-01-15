import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'

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
            <ShareLocationTopTaskButton testID="WasteGuide" />
          </Column>
          {!!isFetchingWasteGuide && (
            <PleaseWait testID="WasteGuideLoadingSpinner" />
          )}
        </Column>
      </Box>
    </HorizontalSafeArea>
    <FigureWithFacadesBackground testID="WasteGuideRequestLocationBackground">
      <HouseholdWasteToContainerImage />
    </FigureWithFacadesBackground>
  </Column>
)
