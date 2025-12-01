import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const BurningGuideCodeRedScreen = () => (
  <Screen testID="BurningGuideCodeRedScreen">
    <Box>
      <Column gutter="lg">
        <Title text="Code rood" />
        <Paragraph>
          De rook waait niet goed weg, omdat er weinig wind staat. Of de
          luchtkwaliteit is op dit moment slecht. Nu stoken zorgt voor extra
          overlast. Bij mensen met longklachten en anderen kunnen
          gezondheidsklachten optreden. Houd rekening met uw buren.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
