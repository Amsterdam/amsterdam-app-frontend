import React from 'react'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
} from '../../components/features/projects'
import {Box} from '../../components/ui'

export const ProjectsScreen = () => (
  <>
    <Box>
      <ProjectsTextSearchField />
      <ProvideAddressButton />
    </Box>
    <ProjectsByText />
    <ProjectsByDistance />
    <ProjectsByDate />
  </>
)
