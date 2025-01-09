import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'
import WasteGuideNotFoundImage from '@/modules/waste-guide/assets/images/waste-guide-not-found.svg'

type Props = {
  hasContent: boolean
}

export const WasteGuideFigure = ({hasContent}: Props) =>
  hasContent ? (
    <FigureWithFacadesBackground testID="WasteGuideBackground">
      <HouseholdWasteToContainerImage />
    </FigureWithFacadesBackground>
  ) : (
    <FigureWithFacadesBackground
      illustrationAspectRatio="portrait"
      testID="WasteGuideNotFoundBackground">
      <WasteGuideNotFoundImage />
    </FigureWithFacadesBackground>
  )
