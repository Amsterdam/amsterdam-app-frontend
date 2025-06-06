import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {AddWasteCardFigure} from '@/modules/waste-container/assets/images/AddWasteCardFigure'
import {AddWasteCardButton} from '@/modules/waste-container/components/AddWasteCardButton'

export const AddWasteCardScreen = () => (
  <Screen
    hasStickyAlert
    testID="AddWasteCardScreen"
    withLeftInset={false}
    withRightInset={false}>
    <Box insetTop="lg">
      <Column gutter="lg">
        <FigureWithFacadesBackground
          height={209}
          illustrationAspectRatio="square"
          testID="AddWasteCardFigureWithFacadesBackground">
          <AddWasteCardFigure />
        </FigureWithFacadesBackground>
        <HorizontalSafeArea>
          <Box insetHorizontal="md">
            <Column gutter="lg">
              <Column gutter="sm">
                <Title
                  level="h2"
                  testID="AddWasteCardScreenTitle"
                  text="Voeg de afvalpas toe"
                />
                <Paragraph>
                  Met de afvalpas kunt u de gfe/t-container in uw buurt openen.
                </Paragraph>
              </Column>
              <AddWasteCardButton />
            </Column>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Box>
  </Screen>
)
