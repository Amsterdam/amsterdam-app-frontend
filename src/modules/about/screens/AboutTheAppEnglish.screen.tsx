import {Alert} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
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

export const AboutTheAppEnglishScreen = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return (
    <Screen
      testID="AboutAboutTheAppEnglishScreen"
      withLeftInset={false}
      withRightInset={false}>
      <Column gutter="lg">
        <HorizontalSafeArea>
          <Box>
            <Column gutter="lg">
              <Title
                accessibilityLanguage="en-US"
                testID="AboutAboutTheAppEnglishTitle"
                text="One app for all Amsterdam residents"
              />
              <Paragraph
                accessibilityLanguage="en-US"
                testID="AboutAboutTheAppEnglishIntroParagraph"
                variant="intro">
                With the Amsterdam app, you can have information at your
                fingertips and get in touch with the City.
              </Paragraph>
              <Paragraph
                accessibilityLanguage="en-US"
                testID="AboutAboutTheAppEnglishSummaryParagraph">
                With the app you can:
              </Paragraph>
              <List
                accessibilityLanguage="en-US"
                items={[
                  'View the rules about waste in your neighbourhood',
                  'Follow and receive notifications about works in your area',
                  'Report a full waste container, litter on the street, or something that is broken',
                  'Use your Stadspas and view your balance',
                ]}
                testID="AboutTheAppEnglishFeaturesList"
              />
              <Column>
                <Title
                  accessibilityLanguage="en-US"
                  level="h2"
                  testID="AboutAboutTheAppEnglishLaterMoreTitle"
                  text="More features are coming soon"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishFutureFeaturesParagraph">
                  The Amsterdam app is a work in progress. Your opinion is
                  important to improve the app. Please let us know.
                </Paragraph>
              </Column>
              {!isLoading && !isError && (
                <Button
                  accessibilityLanguage="en-US"
                  label="Your opinion"
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
                  testID="AboutAboutTheAppEnglishFeedbackLink"
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
