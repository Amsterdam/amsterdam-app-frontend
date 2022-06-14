import React from 'react'
import {Box} from '../../../components/ui'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
} from '../components/projects'

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