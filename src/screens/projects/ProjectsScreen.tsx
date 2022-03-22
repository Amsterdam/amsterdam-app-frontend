import React from 'react'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  SearchField,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <SearchField />
    <ProjectsByText />
    <ProjectsByDistance />
    <ProjectsByDate />
  </>
)
