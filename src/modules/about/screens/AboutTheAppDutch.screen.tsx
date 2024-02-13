import {ImageURISource} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
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
                text="Éen app voor alle Amsterdammers en Weespers"
              />
              <Paragraph
                testID="AboutAboutTheAppDutchIntroParagraph"
                variant="intro">
                Met de Amsterdam app krijgt u snel informatie die voor u
                belangrijk is. En u kunt zaken makkelijk regelen. Zoals:
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
                  text="Informatie over afval"
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
                  text="Werk aan de weg"
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
                  Meld iets dat stuk is, overlast geeft of een volle
                  afvalcontainer.
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
                Deze versie van de Amsterdam app heeft onderwerpen waar iedereen
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
