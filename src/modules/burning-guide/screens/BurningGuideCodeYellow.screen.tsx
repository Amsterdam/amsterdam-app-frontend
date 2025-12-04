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
          Bij code geel is er genoeg wind waardoor de rook niet blijft hangen.
          De luchtkwaliteit is nog voldoende. U kunt hout stoken, maar doe het
          slim.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
