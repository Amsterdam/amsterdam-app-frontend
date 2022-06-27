import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {selectAddress} from '@/modules/address/addressSlice'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
  selectIsProjectsSearching,
  selectProjectSearchText,
} from '@/modules/construction-work/components/projects'

export const ProjectsScreen = () => {
  const {primary: address} = useSelector(selectAddress)
  const isSearching = useSelector(selectIsProjectsSearching)
  const searchText = useSelector(selectProjectSearchText)

  const hasAddress = !!address
  const hasSearchText = !!searchText

  return (
    <>
      <Box>
        <ProjectsTextSearchField />
        <ProvideAddressButton />
      </Box>
      {isSearching ? (
        hasSearchText ? (
          <ProjectsByText searchText={searchText} />
        ) : null
      ) : hasAddress ? (
        <ProjectsByDistance address={address} />
      ) : (
        <ProjectsByDate />
      )}
    </>
  )
}
