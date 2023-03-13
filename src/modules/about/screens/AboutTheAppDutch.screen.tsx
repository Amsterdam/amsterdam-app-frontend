import {useContext} from 'react'
import {ImageURISource} from 'react-native'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Icon, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {DeviceContext} from '@/providers'

export const AboutTheAppDutchScreen = () => {
  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  return (
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
                  text="1 app voor alle Amsterdammers"
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
                    testID="AboutAboutTheAppDutchInformatieOverAfvalIcon"
                  />
                  <Title
                    level="h5"
                    testID="AboutAboutTheAppDutchInformatieOverAfvalTitle"
                    text="Informatie over afval"
                  />
                  <Paragraph testID="AboutAboutTheAppDutchInformatieOverAfvalParagraph">
                    U kunt uw adres invullen. Dan ziet u wanneer u grofvuil
                    (grote stukken afval) aan de weg mag zetten. En u ziet ook
                    waar de dichtstbijzijnde afvalcontainer of flessencontainer
                    is.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon
                    name="construction-work"
                    size="xl"
                    testID="AboutAboutTheAppDutchWerkAanDeWegIcon"
                  />
                  <Title
                    level="h5"
                    testID="AboutAboutTheAppDutchWerkAanDeWegTitle"
                    text="Werk aan de weg"
                  />
                  <Paragraph testID="AboutAboutTheAppDutchWerkAanDeWegParagraph">
                    De gemeente werkt vaak aan de straten, bruggen, kades of
                    gebouwen. In ‘Werkzaamheden’ ziet u de projecten bij u in de
                    buurt. U kunt een project volgen in de app. Als u een
                    project volgt, dan bent u altijd op de hoogte van de
                    werkzaamheden.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon
                    name="alert"
                    size="xl"
                    testID="AboutAboutTheAppDutchMeldingMakenIcon"
                  />
                  <Title
                    level="h5"
                    testID="AboutAboutTheAppDutchMeldingMakenTitle"
                    text="Melding maken"
                  />
                  <Paragraph testID="AboutAboutTheAppDutchMeldingMakenParagraph">
                    Is de container voor afval vol? Doet de lantaarnpaal het
                    niet? Of ligt er troep op straat? Dat kunt u allemaal melden
                    met de app. We lossen het probleem zo snel mogelijk voor u
                    op.
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
                  text="1 app voor alle Amsterdammers en Weespers"
                />
                <Paragraph testID="AboutAboutTheAppDutch1AppParagraph">
                  We maken 1 app voor alle mensen die wonen in Amsterdam en
                  Weesp. De app is zó gemaakt dat iedereen hem kan gebruiken.
                </Paragraph>
              </Column>
              <Column gutter="sm">
                <Title
                  level="h2"
                  testID="AboutAboutTheAppDutchOnderwerpenToekomstTitle"
                  text="Nog meer onderwerpen in de toekomst"
                />
                <Paragraph testID="AboutAboutTheAppDutchOnderwerpenToekomstParagraph">
                  Deze versie van de Amsterdam app heeft onderwerpen waar
                  iedereen iets aan heeft. Dit is het begin. In de toekomst
                  komen er meer onderwerpen en talen bij. Zo maken we de app
                  steeds beter.
                </Paragraph>
              </Column>
            </Track>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Screen>
  )
}
