import AdamEvaCheerBlue from '@/assets/images/adam-eva-cheer-blue.svg'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const NotificationHistoryEmpty = () => (
  <Box
    grow
    inset="no"
    testID="NotificationHistoryEmptyContainer">
    <Box>
      <Gutter height="xxl" />
      <SingleSelectable>
        <Column halign="center">
          <Title
            level="h2"
            text="U heeft geen meldingen"
          />
          <Paragraph variant="intro">In de afgelopen 30 dagen</Paragraph>
        </Column>
      </SingleSelectable>
    </Box>
    <Column
      align="center"
      grow={1}>
      <FigureWithFacadesBackground testID="NotificationHistoryEmptyImage">
        <AdamEvaCheerBlue />
      </FigureWithFacadesBackground>
    </Column>
  </Box>
)
