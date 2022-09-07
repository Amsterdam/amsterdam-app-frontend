import debounce from 'lodash.debounce'
import React, {useEffect, useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SearchField} from '@/components/ui/forms'
import {config} from '@/modules/construction-work/components/projects'
import {
  selectConstructionWorkSearchText,
  setIsSearching,
  setSearchText,
} from '@/modules/construction-work/slice'

export const ProjectsTextSearchField = () => {
  const dispatch = useDispatch()
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
      dispatch(setIsSearching(!!text))
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

  // Reset search data on start
  useEffect(() => {
    dispatch(setIsSearching(false))
    dispatch(setSearchText(''))
  }, [dispatch])

  return (
    <SearchField
      blurOnSubmit={true}
      onChangeText={setSearchData}
      onEndEditing={() => dispatch(setIsSearching(!!searchText))}
      onFocus={() => dispatch(setIsSearching(true))}
      placeholder="Zoek in werkzaamheden"
      value={searchTextValue}
    />
  )
}
