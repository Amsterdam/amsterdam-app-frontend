import {useContext} from 'react'
import {ImageURISource} from 'react-native'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Icon, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {DeviceContext} from '@/providers'

export const AboutTheAppEnglishScreen = () => {
  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  return (
    <Screen
      testID="AboutAboutTheAppEnglishScreen"
      withLeftInset={false}
      withRightInset={false}>
      <Column gutter="lg">
        <Image
          source={
            require('@/modules/about/assets/images/traffic-cycling.1280.50.jpg') as ImageURISource
          }
          testID="AboutAboutTheAppEnglishTrafficCyclingImage"
        />
        <HorizontalSafeArea>
          <Box>
            <Column gutter="lg">
              <Column gutter="sm">
                <Title
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishTitle"
                  text="1 app for all citizens of Amsterdam"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishIntroParagraph"
                  variant="intro">
                  The Amsterdam app quickly provides information tailored to
                  you. Take care of affairs with ease, like:
                </Paragraph>
              </Column>
              <Track gutter="lg">
                <Column gutter="sm">
                  <Icon
                    name="trash-bin"
                    size="xl"
                    testID="AboutAboutTheAppEnglishWasteInformationIcon"
                  />
                  <Title
                    accessibilityLanguage="en-US"
                    level="h5"
                    testID="AboutAboutTheAppEnglishWasteInformationTitle"
                    text="Waste information"
                  />
                  <Paragraph
                    accessibilityLanguage="en-US"
                    testID="AboutAboutTheAppEnglishWasteInformationParagraph">
                    You can enter your address to look up where to dispose of
                    bulky (oversized) waste. This also helps to locate the
                    nearest waste and glass containers.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon
                    name="construction-work"
                    size="xl"
                    testID="AboutAboutTheAppEnglishRoadWorkIcon"
                  />
                  <Title
                    accessibilityLanguage="en-US"
                    level="h5"
                    testID="AboutAboutTheAppEnglishRoadWorkTitle"
                    text="Road work"
                  />
                  <Paragraph
                    accessibilityLanguage="en-US"
                    testID="AboutAboutTheAppEnglishRoadWorkParagraph">
                    The City often performs maintenance on streets, bridges,
                    quays, and buildings. ‘Werkzaamheden’ lists the projects in
                    your area. You can follow a project in the app. If you do
                    so, we keep you up-to-date with any construction work.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon
                    name="alert"
                    size="xl"
                    testID="AboutAboutTheAppEnglishReportProblemIcon"
                  />
                  <Title
                    accessibilityLanguage="en-US"
                    level="h5"
                    testID="AboutAboutTheAppEnglishReportProblemTitle"
                    text="Report it"
                  />
                  <Paragraph
                    accessibilityLanguage="en-US"
                    testID="AboutAboutTheAppEnglishReportProblemParagraph">
                    Is a waste container full, a lamppost not working, or is
                    rubbish lying on the street? You can report any of that
                    within the app. We will take care of these problems as
                    quickly as possible.
                  </Paragraph>
                </Column>
              </Track>
            </Column>
          </Box>
        </HorizontalSafeArea>
        <Image
          source={
            require('@/modules/about/assets/images/people-in-park.1280.50.jpg') as ImageURISource
          }
          testID="AboutAboutTheAppEnglishPeopleInParkImage"
        />
        <HorizontalSafeArea>
          <Box>
            <Track gutter="lg">
              <Column gutter="sm">
                <Title
                  accessibilityLanguage="en-US"
                  level="h2"
                  testID="AboutAboutTheAppEnglish1AppTitle"
                  text="1 app for all citizens of Amsterdam and Weesp"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishAppParagraph">
                  We make 1 app for everyone living in Amsterdam or Weesp. The
                  app has been designed to be usable for anyone.
                </Paragraph>
              </Column>
              <Column gutter="sm">
                <Title
                  accessibilityLanguage="en-US"
                  level="h2"
                  testID="AboutAboutTheAppEnglishFutureFeaturesTitle"
                  text="More topics in the future"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishFutureFeaturesParagraph">
                  This version of the Amsterdam app offers topics that benefit
                  everyone. It is the start of more features and languages to
                  come. We’ll keep improving the app this way.
                </Paragraph>
              </Column>
            </Track>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Screen>
  )
}
