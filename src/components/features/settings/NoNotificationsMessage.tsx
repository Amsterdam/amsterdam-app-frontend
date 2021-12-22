import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuScreenOptions} from '../../../App/navigation/screenOptions'
import {MenuStackParamList} from '../../../App/navigation/types'
import {Box, Text, TextButton, Title} from '../../ui'
import {Column} from '../../ui/layout'

export const NoNotificationsMessage = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'ProjectOverview'>>()

  return (
    <Box background="white">
      <Column gutter="md">
        <Title level={2} text="U ontvangt geen berichten" />
        <Text intro>
          Voor werkzaamheden sturen we af en toe een pushbericht. Dit doen we
          alleen als er iets aan de hand is wat u écht moet weten. Zoals een
          gesprongen waterleiding waardoor de weg is afgezet.
        </Text>
        <Text>
          U kunt pushberichten aan zetten op de pagina van een werkzaamheid.
          Onder ‘Instellingen’ vindt u een overzicht van de werkzaamheden
          waarvoor u pushberichten ontvangt. Deze kunt u altijd weer uit zetten.
        </Text>
        <Text>
          U kunt uw toestemming voor pushberichten intrekken via de instellingen
          van uw toestel. Berichten over uw geselecteerde werkzaamheden
          verschijnen dan nog wel in de app, maar niet meer in het
          berichtencentrum van uw toestel.
        </Text>
        <TextButton
          emphasis
          onPress={() =>
            navigation.navigate(menuScreenOptions.projectOverview.name)
          }
          text="Naar werkzaamheden"
        />
      </Column>
    </Box>
  )
}
