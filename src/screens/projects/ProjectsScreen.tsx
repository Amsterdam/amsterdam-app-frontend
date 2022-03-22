import React from 'react'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
} from '../../components/features/projects'

export const ProjectsScreen = () => (
  <>
    <ProjectsTextSearchField />
    <ProjectsByText />
    <ProjectsByDistance />
    <ProjectsByDate />
  </>
)
