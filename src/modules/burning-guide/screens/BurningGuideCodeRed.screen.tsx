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
          Bij code rood is er of te weinig wind of is de luchtkwaliteit te
          slecht. Dit betekent dat de rook blijft hangen en de lucht nog
          slechter wordt. Stook daarom geen hout.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
