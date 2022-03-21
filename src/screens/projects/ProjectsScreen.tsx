import React from 'react'
import {
  NearestProjects,
  RecentProjects,
  SearchField,
  SearchResults,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <SearchResults />
    <NearestProjects />
    <RecentProjects />
  </>
)
