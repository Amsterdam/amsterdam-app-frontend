import React from 'react'
import {
  NearestProjects,
  SearchField,
  SearchResults,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <SearchResults />
    <NearestProjects />
  </>
)
