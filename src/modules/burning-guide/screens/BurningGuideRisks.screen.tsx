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
          <Title text="Tips om bewuster te stoken" />
          <Paragraph variant="intro">
            De houtkachel of open haard aansteken is gezellig. Maar wist u dat
            de rook uit de schoorsteen slecht is voor de gezondheid van uw
            buren? Ook in uw eigen huis blijven ongezonde stoffen hangen.
            Gelukkig kunt u schoner en bewuster stoken.
          </Paragraph>
          <Paragraph>
            De rook bevat fijnstof. Dit kan zorgen voor hoesten, benauwdheid en
            prikkende ogen, keel of luchtwegen. Als u vaak rook inademt, kan dat
            op lange termijn leiden tot hart- en longziekten. Bovendien is
            houtrook slecht voor het milieu: één avond stoken veroorzaakt
            evenveel fijnstof als een autorit van 1000 kilometer.
          </Paragraph>
        </Column>
      </Box>
      <BurningGuideTipsButton />
    </Column>
  </Screen>
)
