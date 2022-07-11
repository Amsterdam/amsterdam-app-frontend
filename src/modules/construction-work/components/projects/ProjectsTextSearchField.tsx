import debounce from 'lodash.debounce'
import React, {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SearchField} from '@/components/ui/forms'
import {config} from '@/modules/construction-work/components/projects'
import {
  selectConstructionWorkSearchText,
  setIsSearching,
  setSearchText,
} from '@/modules/construction-work/construction-work.slice'

export const ProjectsTextSearchField = () => {
  const dispatch = useDispatch()
  const searchText = useSelector(selectConstructionWorkSearchText)

  /**
   * Updates ‘search text’ if it has at least three characters, or it is empty.
   * Sets ‘is searching’ to ‘true’ if search text is not empty.
   */
  const dispatchSearchData = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length > 0 && text.length < 3) {
          return
        }

        dispatch(setIsSearching(!!text))
        dispatch(setSearchText(text))
      }, config.searchBoxDebounceDuration),
    [dispatch],
  )

  // Reset search data on start
  useEffect(() => {
    dispatch(setIsSearching(false))
    dispatch(setSearchText(''))
  }, [dispatch])

  return (
    <SearchField
      blurOnSubmit={true}
      onChangeText={dispatchSearchData}
      onEndEditing={() => dispatch(setIsSearching(!!searchText))}
      onFocus={() => dispatch(setIsSearching(true))}
      placeholder="Zoek in werkzaamheden"
    />
  )
}
