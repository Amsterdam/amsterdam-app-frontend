import {Alert} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Figure} from '@/components/ui/media/Figure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import TwoPersonsHighFiveImage from '@/modules/about/assets/images/two-persons-high-five.svg'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'

import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export const FeedbackScreen = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return (
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
              Mist u onderwerpen in de app? Of ziet u iets dat niet klopt of
              niet handig werkt?
            </Paragraph>
            {isLoading ? (
              <PleaseWait testID="AboutFeedbackPleaseWait" />
            ) : isError ? (
              <SomethingWentWrong testID="AboutFeedbackSomethingWentWrong" />
            ) : (
              <Button
                label="Laat het ons weten"
                onPress={() => {
                  if (redirectUrls?.feedbackForm) {
                    openWebUrl(redirectUrls.feedbackForm)
                  } else {
                    Alert.alert(
                      'Sorry, deze functie is nu niet beschikbaar. Probeer het later nog eens.',
                    )

                    trackException(
                      ExceptionLogKey.getRedirectsUrl,
                      'FeedbackScreen.ts',
                      {redirectsKey: 'feedback'},
                    )
                  }
                }}
                role="link"
                testID="AboutFeedbackLink"
              />
            )}
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
}
