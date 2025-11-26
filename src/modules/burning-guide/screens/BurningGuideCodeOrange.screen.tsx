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
          De rook waait weg, omdat er genoeg wind staat. Maar de luchtkwaliteit
          is matig. Stoken zorgt voor overlast. Mensen hebben last van uw rook,
          bijvoorbeeld als ze longklachten hebben. Houd rekening met uw buren.
        </Paragraph>
      </Column>
    </Box>
  </Screen>
)
