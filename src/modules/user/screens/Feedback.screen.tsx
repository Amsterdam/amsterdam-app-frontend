import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Figure} from '@/components/ui/media/Figure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'
import TwoPersonsHighFiveImage from '@/modules/user/assets/images/two-persons-high-five.svg'

export const FeedbackScreen = () => (
  <Screen testID="AboutFeedbackScreen">
    <Box grow>
      <Column
        align="between"
        grow={1}
        gutter="lg">
        <Column gutter="md">
          <Title
            testID="AboutFeedbackTitle"
            text="Uw mening"
          />
          <Paragraph
            testID="AboutFeedbackIntroParagraph"
            variant="intro">
            Mist u onderwerpen in de app? Of ziet u iets dat niet klopt of niet
            handig werkt?
          </Paragraph>
          <ExternalLinkButton
            label="Laat het ons weten"
            redirectKey={RedirectKey.feedbackForm}
            testID="AboutFeedbackExternalLinkButton"
          />
        </Column>
        <Column
          align="center"
          flex={1}>
          <Figure height={256}>
            <TwoPersonsHighFiveImage />
          </Figure>
        </Column>
      </Column>
    </Box>
  </Screen>
)
