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
      testID="AboutScreenAboutTheAppDutch"
      withLeftInset={false}
      withRightInset={false}>
      <Column gutter="lg">
        <Image
          source={
            require('@/modules/about/assets/traffic-cycling.1280.50.jpg') as ImageURISource
          }
        />
        <HorizontalSafeArea>
          <Box>
            <Column gutter="xl">
              <Column gutter="sm">
                <Title text="1 app voor alle Amsterdammers" />
                <Paragraph variant="intro">
                  Met de Amsterdam app krijgt u snel informatie die voor u
                  belangrijk is. En u kunt zaken makkelijk regelen. Zoals:
                </Paragraph>
              </Column>
              <Track gutter="lg">
                <Column gutter="sm">
                  <Icon name="trash-bin" size="xl" />
                  <Title level="h5" text="Informatie over afval" />
                  <Paragraph>
                    U kunt uw adres invullen. Dan ziet u wanneer u grofvuil
                    (grote stukken afval) aan de weg mag zetten. En u ziet ook
                    waar de dichtstbijzijnde afvalcontainer of flessencontainer
                    is.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon name="construction-work" size="xl" />
                  <Title level="h5" text="Werk aan de weg" />
                  <Paragraph>
                    De gemeente werkt vaak aan de straten, bruggen, kades of
                    gebouwen. In ‘Werkzaamheden’ ziet u de projecten bij u in de
                    buurt. U kunt een project volgen in de app. Als u een
                    project volgt, dan bent u altijd op de hoogte van de
                    werkzaamheden.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon name="alert" size="xl" />
                  <Title level="h5" text="Melding maken" />
                  <Paragraph>
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
            require('@/modules/about/assets/people-in-park.1280.50.jpg') as ImageURISource
          }
        />
        <HorizontalSafeArea>
          <Box>
            <Track gutter="lg">
              <Column gutter="sm">
                <Title
                  level="h2"
                  text="1 app voor alle Amsterdammers en Weespers"
                />
                <Paragraph>
                  We maken 1 app voor alle mensen die wonen in Amsterdam en
                  Weesp. De app is zó gemaakt dat iedereen hem kan gebruiken.
                </Paragraph>
              </Column>
              <Column gutter="sm">
                <Title level="h2" text="Nog meer onderwerpen in de toekomst" />
                <Paragraph>
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
