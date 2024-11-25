import AdamEvaCheerBlue from '@/assets/images/adam-eva-cheer-blue.svg'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const NotificationHistoryEmpty = () => (
  <Box
    grow
    inset="no"
    testID="NotificationHistoryEmptyContainer">
    <Box>
      <Column halign="center">
        <Title
          level="h4"
          text="U heeft geen meldingen"
        />
        <Paragraph>In de afgelopen 30 dagen</Paragraph>
      </Column>
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
