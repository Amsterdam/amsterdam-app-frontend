import {Alert} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export const AboutTheAppDutchScreen = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return (
    <Screen
      testID="AboutAboutTheAppDutchScreen"
      withLeftInset={false}
      withRightInset={false}>
      <Column gutter="lg">
        <HorizontalSafeArea>
          <Box>
            <Column gutter="lg">
              <Title
                testID="AboutAboutTheAppDutchTitle"
                text="Eén app voor alle Amsterdammers"
              />
              <Paragraph
                testID="AboutAboutTheAppDutchIntroParagraph"
                variant="intro">
                Met de Amsterdam App heeft u handige informatie bij de hand en
                kunt u meteen iets regelen met de gemeente.
              </Paragraph>
              <Paragraph testID="AboutAboutTheAppDutchSummaryParagraph">
                Dit kunt u zoal doen met de app:
              </Paragraph>
              <List
                items={[
                  'De regels over afval in uw buurt bekijken',
                  'Werkzaamheden in uw buurt volgen en hiervan meldingen ontvangen',
                  'Een melding doen van een volle afvalcontainer, afval op straat of iets dat stuk is',
                  'Uw Stadspas gebruiken en uw saldo bekijken',
                ]}
                testID="AboutTheAppDutchFeaturesList"
              />
              <Column>
                <Title
                  level="h2"
                  testID="AboutAboutTheAppDutchLaterMoreTitle"
                  text="Later meer"
                />
                <Paragraph testID="AboutAboutTheAppDutchFutureFeaturesParagraph">
                  De Amsterdam App is in ontwikkeling. Uw mening is belangrijk
                  om de app te verbeteren. Laat het ons weten.
                </Paragraph>
              </Column>
              {!isLoading && !isError && (
                <ExternalLinkButton
                  label="Uw mening"
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
                  testID="AboutAboutTheAppDutchFeedbackExternalLinkButton"
                  variant="secondary"
                />
              )}
            </Column>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Screen>
  )
}
