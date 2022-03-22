import React from 'react'
import {
  FoundProjects,
  NearestProjects,
  RecentProjects,
  SearchField,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <FoundProjects />
    <NearestProjects />
    <RecentProjects />
  </>
)
