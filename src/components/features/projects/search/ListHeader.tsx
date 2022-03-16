import React from 'react'
import {Box, Text, Title} from '../../../ui'

type Props = {
  projectsLength: number
}

export const ListHeader = ({projectsLength}: Props) => (
  <>
    <Box background="grey">
      <Text intro>{projectsLength} zoekresultaten</Text>
    </Box>
    {projectsLength === 0 ? (
      <Box insetHorizontal="md">
        <Title level={3} text="Helaas…" />
        <Text>We hebben geen resultaten gevonden voor deze zoekterm.</Text>
      </Box>
    ) : null}
  </>
)
