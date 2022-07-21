import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/addressSlice'
import {
  ProjectsByDate,
  ProjectsByDistance,
  ProjectsByText,
  ProjectsTextSearchField,
  ProvideAddressButton,
} from '@/modules/construction-work/components/projects'
import {
  selectConstructionWorkIsSearching,
  selectConstructionWorkSearchText,
} from '@/modules/construction-work/construction-work.slice'

export const ProjectsScreen = () => {
  const {primary: address} = useSelector(selectAddress)
  const isSearching = useSelector(selectConstructionWorkIsSearching)
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasAddress = !!address
  const hasSearchText = !!searchText

  return (
    <Screen scroll={false} withBottomInset={false}>
      <Box insetHorizontal="md">
        <ProjectsTextSearchField />
        {!hasAddress && !isSearching && <ProvideAddressButton />}
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
    </Screen>
  )
}
