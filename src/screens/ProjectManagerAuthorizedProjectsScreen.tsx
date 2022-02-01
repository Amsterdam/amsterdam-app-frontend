import React from 'react'
import {AuthorizedProjects} from '../components/features/project/AuthorizedProjects'
import {Box, Text, Title} from '../components/ui'
import {Gutter, ScrollView} from '../components/ui/layout'

export const ProjectManagerAuthorizedProjectsScreen = () => (
  <ScrollView>
    <Box background="white">
      <Title text="Berichten sturen" />
      <Gutter height="sm" />
      <Text>
        Voor de onderstaande projecten mag u pushberichten sturen. Dit kunt u
        doen vanaf de pagina van een bouwproject.
      </Text>
    </Box>
    <AuthorizedProjects />
  </ScrollView>
)
