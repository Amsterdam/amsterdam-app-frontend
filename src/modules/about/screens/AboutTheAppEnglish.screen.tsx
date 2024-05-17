import {ImageURISource} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Track} from '@/components/ui/layout/Track'
import {Icon} from '@/components/ui/media/Icon'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const AboutTheAppEnglishScreen = () => (
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
                text="One app for all citizens of Amsterdam and Weesp"
              />
              <Paragraph
                accessibilityLanguage="en-US"
                testID="AboutAboutTheAppEnglishIntroParagraph"
                variant="intro">
                The Amsterdam App gives you useful information to immediately
                take care of matters with the municipality. For example:
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
                  text="Information about waste"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishWasteInformationParagraph">
                  Fill in your address and you will immediately see what you can
                  do with your waste.
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
                  text="Work on the road"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishRoadWorkParagraph">
                  Here you can find information about projects and roadworks in
                  your neighbourhood.
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
                  text="Report something"
                />
                <Paragraph
                  accessibilityLanguage="en-US"
                  testID="AboutAboutTheAppEnglishReportProblemParagraph">
                  Report something that is broken or causes a nuisance, or
                  report a full waste container.
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
                testID="AboutAboutTheAppEnglishFutureFeaturesTitle"
                text="More later"
              />
              <Paragraph
                accessibilityLanguage="en-US"
                testID="AboutAboutTheAppEnglishFutureFeaturesParagraph">
                This version of the Amsterdam App has subjects that are useful
                to everybody. This is a start. In the future there will be more
                subjects and languages. This way we will keep improving the app.
              </Paragraph>
            </Column>
          </Track>
        </Box>
      </HorizontalSafeArea>
    </Column>
  </Screen>
)
