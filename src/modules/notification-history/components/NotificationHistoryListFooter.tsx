import {Box} from '@/components/ui/containers/Box'
import {Paragraph} from '@/components/ui/text/Paragraph'

export const NotificationHistoryListFooter = () => (
  <Box inset="xl">
    <Paragraph
      color="secondary"
      textAlign="center">
      Dit zijn alle meldingen van de afgelopen 30 dagen
    </Paragraph>
  </Box>
)
