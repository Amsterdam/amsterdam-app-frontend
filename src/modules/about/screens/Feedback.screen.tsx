import {Alert} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {Figure} from '@/components/ui/media/Figure'
import {Link} from '@/components/ui/text/Link'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import TwoPersonsHighFiveImage from '@/modules/about/assets/images/two-persons-high-five.svg'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

export const FeedbackScreen = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const {sendSentryErrorLog} = useSentry()

  return (
    <Screen testID="AboutFeedbackScreen">
      <Box grow>
        <Column
          align="between"
          grow
          gutter="lg">
          <Column gutter="md">
            <Title
              testID="AboutFeedbackTitle"
              text="Dit kan beter"
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
              <SomethingWentWrong />
            ) : (
              <Link
                label="Laat het ons weten"
                onPress={() => {
                  if (redirectUrls?.feedback) {
                    openWebUrl(redirectUrls.feedback)
                  } else {
                    Alert.alert(
                      'Sorry, deze functie is nu niet beschikbaar. Probeer het later nog eens.',
                    )

                    sendSentryErrorLog(
                      SentryErrorLogKey.getRedirectsUrl,
                      'FeedbackScreen.ts',
                      {redirectsKey: 'feedback'},
                    )
                  }
                }}
                testID="AboutFeedbackLink"
                variant="external"
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
