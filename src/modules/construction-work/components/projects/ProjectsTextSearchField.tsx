import {useNavigation} from '@react-navigation/native'
import debounce from 'lodash.debounce'
import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SearchField} from '@/components/ui/forms'
import {config} from '@/modules/construction-work/components/projects'
import {
  selectConstructionWorkSearchText,
  setSearchText,
} from '@/modules/construction-work/slice'

export const ProjectsTextSearchField = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const searchText = useSelector(selectConstructionWorkSearchText)

  /**
   * Keep track of the searchText for the SearchField component
   */
  const [searchTextValue, setSearchTextValue] = useState(searchText)

  /**
   * Updates ‘search text’ in the redux state if it has at least three characters, or it is empty.
   * With a debounce function to limit the number of requests to the backend.
   * Sets ‘is searching’ to ‘true’ if search text is not empty.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storeSearchTextInState = useCallback(
    debounce((text: string) => {
      if (text.length > 0 && text.length < 3) {
        return
      }
      dispatch(setSearchText(text))
    }, config.searchBoxDebounceDuration),
    [dispatch],
  )

  /**
   * Updates ‘search text’ and ‘is searching’ to ‘true’ in the redux state.
   * Sets the searchTextValue in the component state, which is used in the SearchField
   */
  const setSearchData = useCallback(
    (text: string) => {
      setSearchTextValue(text)
      storeSearchTextInState(text)
    },
    [setSearchTextValue, storeSearchTextInState],
  )

  /**
   * Clears search state when navigating out of this module.
   */
  useEffect(() =>
    navigation.addListener('beforeRemove', () => {
      dispatch(setSearchText(''))
    }),
  )

  return (
    <SearchField
      autoFocus
      blurOnSubmit={true}
      onChangeText={setSearchData}
      placeholder="Type drie letters of meer …"
      testID="ConstructionWorkProjectsTextSearchField"
      value={searchTextValue}
    />
  )
}
