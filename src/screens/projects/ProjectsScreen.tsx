import React from 'react'
import {useSelector} from 'react-redux'
import {NearestProjects} from '../../components/features/projects'
import {
  Results,
  SearchField,
  selectProjectSearchText,
} from '../../components/features/projects/search'

export const ProjectsScreen = () => {
  const searchText = useSelector(selectProjectSearchText)

  return (
    <>
      <SearchField />
      {searchText ? <Results text={searchText} /> : <NearestProjects />}
    </>
  )
}
