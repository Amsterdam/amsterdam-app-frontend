/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import {Alert, ConstructionWork, TrashBin} from '@/assets/icons'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Icon, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'
import {SvgProps} from '@/types'

export const AppSummaryScreen = () => {
  const iconProps = useThemable(createIconProps)

  return (
    <Screen>
      <Column gutter="md">
        <Image source={require('../assets/header.jpeg')} />
        <Box>
          <Column gutter="xl">
            <Column gutter="sm">
              <Title text="1 app voor alle Amsterdammers" />
              <Paragraph variant="intro">
                Met de Amsterdam app krijgt u snel informatie die voor u
                belangrijk is. En u kunt zaken makkelijk regelen. Zoals:
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Icon size={32}>
                <TrashBin {...iconProps} />
              </Icon>
              <Title level="h5" text="Informatie over afval" />
              <Paragraph>
                U kunt uw adres invullen. Dan ziet u wanneer u grofvuil (grote
                stukken afval) aan de weg mag zetten. En u ziet ook waar de
                dichtstbijzijnde afvalcontainer of flessencontainer is.
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Icon size={32}>
                <ConstructionWork {...iconProps} />
              </Icon>
              <Title level="h5" text="Werk aan de weg" />
              <Paragraph>
                De gemeente werkt vaak aan de straten, bruggen, kades of
                gebouwen. In 'Werkzaaamheden’ ziet u de projecten bij u in de
                buurt. U kunt een project volgen in de app. Als u een project
                volgt, dan bent u altijd op de hoogte van de werkzaamheden.
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Icon size={32}>
                <Alert {...iconProps} />
              </Icon>
              <Title level="h5" text="Melding maken " />
              <Paragraph>
                Is de container voor afval vol? Doet de lantaarnpaal het niet?
                Of ligt er troep op straat? Dat kunt u allemaal melden met de
                app. We lossen het probleem zo snel mogelijk voor u op.
              </Paragraph>
            </Column>
            <Image source={require('../assets/article.jpeg')} />
            <Column gutter="sm">
              <Title
                level="h2"
                text="1 app voor alle Amsterdammers en Weespers"
              />
              <Paragraph>
                We maken 1 app voor alle mensen die wonen in Amsterdam en Weesp.
                De app is zó gemaakt dat iedereen hem kan gebruiken.
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Title level="h2" text="Nog meer onderwerpen in de toekomst" />
              <Paragraph>
                Deze versie van de Amsterdam app heeft onderwerpen waar iedereen
                iets aan heeft. Dit is het begin. In de toekomst komen er meer
                onderwerpen en talen bij. Zo maken we de app steeds beter.
              </Paragraph>
            </Column>
          </Column>
        </Box>
      </Column>
    </Screen>
  )
}

const createIconProps = ({color}: Theme): SvgProps => ({
  fill: color.text.default,
})
