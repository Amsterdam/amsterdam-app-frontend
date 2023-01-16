import React from 'react'
import {useSelector} from 'react-redux'
import {ProjectsByText} from '@/modules/construction-work/components/projects'
import {
  selectConstructionWorkIsSearching,
  selectConstructionWorkSearchText,
} from '@/modules/construction-work/slice'

export const ConstructionWorkSearchScreen = () => {
  const isSearching = useSelector(selectConstructionWorkIsSearching)
  const searchText = useSelector(selectConstructionWorkSearchText)

  if (isSearching) {
    return null
  }

  return <ProjectsByText searchText={searchText} />
}
