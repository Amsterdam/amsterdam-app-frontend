import React from 'react'
import {Projects} from '../../components/features/projects'
import {
  SearchField,
  SearchResults,
} from '../../components/features/projects/search'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <SearchResults />
    <Projects />
  </>
)
