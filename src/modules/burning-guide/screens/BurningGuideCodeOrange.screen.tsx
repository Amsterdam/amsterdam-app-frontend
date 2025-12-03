import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const BurningGuideCodeOrangeScreen = () => (
  <Screen testID="BurningGuideCodeOrangeScreen">
    <Box>
      <Column gutter="lg">
        <Title text="Code oranje" />
        <Paragraph>
          Bij code oranje is er genoeg wind om de rook weg te blazen, maar de
          luchtkwaliteit is matig. Als u hout stookt wordt de lucht voor u en de
          buren slechter. Stook daarom liever niet.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
