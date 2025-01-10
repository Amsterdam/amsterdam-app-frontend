import {Screen} from '@/components/features/screen/Screen'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {AddWasteCardFigure} from '@/modules/open-waste-container/assets/images/AddWasteCardFigure'

export const AddWasteCardScreen = () => (
  <Screen testID="AddWasteCardScreen">
    <FigureWithFacadesBackground
      height={209}
      illustrationAspectRatio="default"
      testID="AddWasteCardFigureWithFacadesBackground">
      <AddWasteCardFigure />
    </FigureWithFacadesBackground>
  </Screen>
)
