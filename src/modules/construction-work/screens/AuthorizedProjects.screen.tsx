import React from 'react'
import {Box, Text, Title} from '@/components/ui'
import {TextButton} from '@/components/ui/buttons'
import {Gutter, Screen, ScrollView} from '@/components/ui/layout'
import {AuthorizedProjectsUserSection} from '@/modules/user/components'
import {openMailUrl} from '@/utils'

export const AuthorizedProjectsScreen = () => (
  <Screen>
    <ScrollView>
      <Box>
        <Title text="Berichten sturen" />
        <Gutter height="sm" />
        <Text>
          Voor de onderstaande projecten mag je pushberichten sturen. Dit kun je
          doen vanaf de pagina van een bouwproject.
        </Text>
      </Box>
      <Gutter height="lg" />
      <AuthorizedProjectsUserSection />
      <Box>
        <Text small>Ontbreekt er een bouwproject?</Text>
        <TextButton
          emphasis
          label="Neem contact op met de redactie"
          onPress={() =>
            openMailUrl(
              'redactieprojecten@amsterdam.nl',
              'Bouwprojecten in de Amsterdam app',
            )
          }
        />
      </Box>
    </ScrollView>
  </Screen>
)
