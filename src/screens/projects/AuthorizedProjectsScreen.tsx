import React from 'react'
import {AuthorizedProjectsSettingsSection} from '../../components/features/settings/project-management/AuthorizedProjectsSettingsSection'
import {Box, Text, TextButton, Title} from '../../components/ui'
import {Gutter, ScrollView} from '../../components/ui/layout'
import {openMailUrl} from '../../utils'

export const AuthorizedProjectsScreen = () => (
  <ScrollView>
    <Box background="white">
      <Title text="Berichten sturen" />
      <Gutter height="sm" />
      <Text>
        Voor de onderstaande projecten mag je pushberichten sturen. Dit kun je
        doen vanaf de pagina van een bouwproject.
      </Text>
    </Box>
    <Gutter height="lg" />
    <AuthorizedProjectsSettingsSection />
    <Box>
      <Text small>Ontbreekt er een bouwproject?</Text>
      <TextButton
        emphasis
        onPress={() =>
          openMailUrl(
            'redactieprojecten@amsterdam.nl',
            'Bouwprojecten in de Amsterdam app',
          )
        }
        text="Neem contact op met de redactie"
      />
    </Box>
  </ScrollView>
)
