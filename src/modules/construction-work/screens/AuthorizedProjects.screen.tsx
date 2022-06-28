import React from 'react'
import {Box, Text, Title} from '@/components/ui'
import {TextButton} from '@/components/ui/buttons'
import {Gutter, ScrollView} from '@/components/ui/layout'
import {AuthorizedProjectsUserSection} from '@/modules/user/components'
import {openMailUrl} from '@/utils'

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
    <AuthorizedProjectsUserSection />
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
