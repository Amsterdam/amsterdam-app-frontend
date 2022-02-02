import React from 'react'
import {AuthorizedProjectsList} from '../components/features/settings/AuthorizedProjectsList'
import {Box, Text, TextButton, Title} from '../components/ui'
import {Gutter, ScrollView} from '../components/ui/layout'

export const AuthorizedProjectsScreen = () => (
  <ScrollView>
    <Box background="white">
      <Title text="Berichten sturen" />
      <Gutter height="sm" />
      <Text>
        Voor de onderstaande projecten mag u pushberichten sturen. Dit kunt u
        doen vanaf de pagina van een bouwproject.
      </Text>
    </Box>
    <AuthorizedProjectsList />
    <Box>
      <Text small>Ontbreekt er een bouwproject?</Text>
      <TextButton emphasis text="Neem contact op met de redactie" />
    </Box>
  </ScrollView>
)
