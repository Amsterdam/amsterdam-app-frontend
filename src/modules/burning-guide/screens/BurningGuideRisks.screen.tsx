import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {BurningGuideTipsButton} from '@/modules/burning-guide/components/BurningGuideTipsButton'

export const BurningGuideRisksScreen = () => (
  <Screen testID="BurningGuideRisksScreen">
    <Column gutter="lg">
      <Box>
        <Column gutter="lg">
          <Title text="Rook van hout is slecht voor uw gezondheid" />
          <Paragraph variant="intro">
            Rook bevat fijnstof. Dit kan zorgen voor hoesten, benauwdheid en
            prikkende ogen, keel of luchtwegen. Als u vaak rook inademt, heeft u
            meer kans op hart- en longziekten. Houtrook is ook slecht voor het
            milieu: 1 avond stoken veroorzaakt evenveel fijnstof als een autorit
            van 1000 kilometer.
          </Paragraph>
        </Column>
      </Box>
      <BurningGuideTipsButton />
    </Column>
  </Screen>
)
