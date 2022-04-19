import React from 'react'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <ProjectsTextSearchField />
    <ProvideAddressButton />
    <ProjectsByText />
    <ProjectsByDistance />
    <ProjectsByDate />
  </>
)
