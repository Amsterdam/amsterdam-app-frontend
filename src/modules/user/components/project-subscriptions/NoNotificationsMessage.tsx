import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {Box, Title, TextButton, Text} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'

export const NoNotificationsMessage = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  return (
    <Box background="white">
      <Column gutter="md">
        <Title level={2} text="U ontvangt geen berichten" />
        <Text intro>
          Voor bouwprojecten sturen we af en toe een pushbericht. Dit doen we
          alleen als er iets aan de hand is wat u écht moet weten. Zoals een
          gesprongen waterleiding waardoor de weg is afgezet.
        </Text>
        <Text>
          U kunt pushberichten aan zetten op de pagina van een bouwproject.
          Onder ‘Instellingen’ vindt u een overzicht van de bouwprojecten
          waarvoor u pushberichten ontvangt. Deze kunt u altijd weer uit zetten.
        </Text>
        <Text>
          U kunt uw toestemming voor pushberichten intrekken via de instellingen
          van uw toestel. Berichten over uw geselecteerde bouwprojecten
          verschijnen dan nog wel in de app, maar niet meer in het
          berichtencentrum van uw toestel.
        </Text>
        <TextButton
          emphasis
          onPress={() => navigation.navigate(routes.projects.name)}
          text="Naar bouwprojecten"
        />
      </Column>
    </Box>
  )
}
