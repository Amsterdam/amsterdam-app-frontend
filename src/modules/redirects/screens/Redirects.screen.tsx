import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Redirects} from '@/modules/redirects/components/Redirects'
import {ReferToWebsite} from '@/modules/redirects/components/ReferToWebsite'

export const RedirectsScreen = () => (
  <Screen testID="RedirectsScreen">
    <Box>
      <Column gutter="lg">
        <Paragraph>
          Voor deze onderwerpen kunt u terecht op onze website.
        </Paragraph>
        <Redirects />
        <ReferToWebsite />
      </Column>
    </Box>
  </Screen>
)
