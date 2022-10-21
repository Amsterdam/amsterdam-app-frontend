import {useNavigation} from '@react-navigation/core'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
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
  setIsSearching,
  setSearchText,
} from '@/modules/construction-work/slice'

export const ConstructionWorkScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const address = useSelector(selectAddress)
  const isSearching = useSelector(selectConstructionWorkIsSearching)
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasAddress = !!address.adres
  const hasSearchText = !!searchText

  // Clear search state when navigating out of this module.
  useEffect(() =>
    navigation.addListener('beforeRemove', () => {
      dispatch(setIsSearching(false))
      dispatch(setSearchText(''))
    }),
  )

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
