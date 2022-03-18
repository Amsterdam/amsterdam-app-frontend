import React from 'react'
import {
  Projects,
  SearchField,
  SearchResults,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <SearchResults />
    <Projects />
  </>
)
