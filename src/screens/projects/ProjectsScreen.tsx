import React from 'react'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
} from '../../components/features/projects'
import {Box} from '../../components/ui'
import {Column} from '../../components/ui/layout'

export const ProjectsScreen = () => (
  <>
    <Box>
      <Column gutter="md">
        <ProjectsTextSearchField />
        <ProvideAddressButton />
      </Column>
    </Box>
    <ProjectsByText />
    <ProjectsByDistance />
    <ProjectsByDate />
  </>
)
