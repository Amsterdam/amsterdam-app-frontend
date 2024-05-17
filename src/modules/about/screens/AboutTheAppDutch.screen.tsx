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

export const AboutTheAppDutchScreen = () => (
  <Screen
    testID="AboutAboutTheAppDutchScreen"
    withLeftInset={false}
    withRightInset={false}>
    <Column gutter="lg">
      <Image
        source={
          require('@/modules/about/assets/images/traffic-cycling.1280.50.jpg') as ImageURISource
        }
        testID="AboutAboutTheAppDutchTrafficCyclingImage"
      />
      <HorizontalSafeArea>
        <Box>
          <Column gutter="xl">
            <Column gutter="sm">
              <Title
                testID="AboutAboutTheAppDutchTitle"
                text="Eén app voor alle Amsterdammers en Weespers"
              />
              <Paragraph
                testID="AboutAboutTheAppDutchIntroParagraph"
                variant="intro">
                Met de Amsterdam App heeft u handige informatie bij de hand en
                kunt u meteen iets regelen met de gemeente. Zoals:
              </Paragraph>
            </Column>
            <Track gutter="lg">
              <Column gutter="sm">
                <Icon
                  name="trash-bin"
                  size="xl"
                  testID="AboutAboutTheAppDutchWasteInformationIcon"
                />
                <Title
                  level="h5"
                  testID="AboutAboutTheAppDutchWasteInformationTitle"
                  text="Afvalwijzer"
                />
                <Paragraph testID="AboutAboutTheAppDutchWasteInformationParagraph">
                  Vul uw adres in en u ziet meteen wat u met uw afval moet doen.
                </Paragraph>
              </Column>
              <Column gutter="sm">
                <Icon
                  name="construction-work"
                  size="xl"
                  testID="AboutAboutTheAppDutchRoadWorkIcon"
                />
                <Title
                  level="h5"
                  testID="AboutAboutTheAppDutchRoadWorkTitle"
                  text="Werkzaamheden"
                />
                <Paragraph testID="AboutAboutTheAppDutchRoadWorkParagraph">
                  Hier krijgt u informatie over projecten en wegwerkzaamheden in
                  uw buurt.
                </Paragraph>
              </Column>
              <Column gutter="sm">
                <Icon
                  name="alert"
                  size="xl"
                  testID="AboutAboutTheAppDutchReportProblemIcon"
                />
                <Title
                  level="h5"
                  testID="AboutAboutTheAppDutchReportProblemTitle"
                  text="Melding doen"
                />
                <Paragraph testID="AboutAboutTheAppDutchReportProblemParagraph">
                  Meld een volle afvalcontainer, overlast of iets dat stuk is.
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
        testID="AboutAboutTheAppDutchPeopleInParkImage"
      />
      <HorizontalSafeArea>
        <Box>
          <Track gutter="lg">
            <Column gutter="sm">
              <Title
                level="h2"
                testID="AboutAboutTheAppDutch1AppTitle"
                text="Later meer"
              />
              <Paragraph testID="AboutAboutTheAppDutchFutureFeaturesParagraph">
                Deze versie van de Amsterdam App heeft onderwerpen waar iedereen
                iets aan heeft. Dit is het begin. In de toekomst komen er meer
                onderwerpen en talen bij. Zo maken we de app steeds beter.
              </Paragraph>
            </Column>
          </Track>
        </Box>
      </HorizontalSafeArea>
    </Column>
  </Screen>
)
