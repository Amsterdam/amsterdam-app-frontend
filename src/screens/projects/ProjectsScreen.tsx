import React from 'react'
import {useSelector} from 'react-redux'
import {
  NearestProjects,
  Results,
  SearchField,
} from '../../components/features/projects'
import {selectProjectSearchText} from '../../components/features/projects/search/projectsSearchSlice'

export const ProjectsScreen = () => {
  const searchText = useSelector(selectProjectSearchText)

  return (
    <>
      <SearchField />
      {searchText ? <Results text={searchText} /> : <NearestProjects />}
    </>
  )
}
