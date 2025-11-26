import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const BurningGuideCodeYellowScreen = () => (
  <Screen testID="BurningGuideCodeYellowScreen">
    <Box>
      <Column gutter="lg">
        <Title text="Code geel" />
        <Paragraph>
          De rook blijft niet hangen, omdat er genoeg wind staat. Ook is de
          luchtkwaliteit voldoende. Maar stoken zorgt ook nu voor overlast en
          luchtverontreiniging. Houd rekening met uw buren.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
