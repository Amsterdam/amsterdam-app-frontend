import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {HouseholdWasteToContainerImage} from '@/modules/waste-guide/assets/images'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useTheme} from '@/themes/useTheme'

export const RequestLocation = () => {
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()
  const {open: openBottomSheet} = useBottomSheet()
  const getCurrentCoordinates = useGetCurrentCoordinates()

  const onPressTopTaskButton = useCallback(() => {
    getCurrentCoordinates()
    openBottomSheet()
  }, [getCurrentCoordinates, openBottomSheet])

  return (
    <Column
      align="between"
      grow>
      <HorizontalSafeArea>
        <Box>
          <Column gutter="md">
            <Title text="Voor welke locatie wilt u informatie over afval?" />
            <Row>
              <TopTaskButton
                iconName="location"
                onPress={onPressTopTaskButton}
                testID="WasteGuideRequestLocationButton"
                title="Geef uw locatie door"
                titleIconName="chevron-down"
              />
            </Row>
          </Column>
        </Box>
      </HorizontalSafeArea>
      <FigureWithFacadesBackground
        height={media.figureHeight.lg}
        Image={<HouseholdWasteToContainerImage />}
        imageAspectRatio={media.illustrationAspectRatio.landscape}
        imageWidth={media.illustrationWidth.wide}
        moveUp={isLandscape ? 128 : undefined}
      />
    </Column>
  )
}
