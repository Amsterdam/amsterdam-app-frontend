import React from 'react'
import {NearestProjects} from '../../components/features/projects'
import {Results, SearchField} from '../../components/features/projects/search'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <Results />
    <NearestProjects />
  </>
)
