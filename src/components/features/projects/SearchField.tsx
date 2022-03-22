import debounce from 'lodash.debounce'
import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Box} from '../../ui'
import {TextInput} from '../../ui/forms'
import {config} from './config'
import {
  selectProjectSearchText,
  setIsSearching,
  setSearchText,
} from './projectsSearchSlice'

export const SearchField = () => {
  const dispatch = useDispatch()
  const searchText = useSelector(selectProjectSearchText)

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

  return (
    <Box>
      <TextInput
        blurOnSubmit={true}
        label="Zoek in alle bouwprojecten"
        onChangeText={dispatchSearchData}
        onFocus={() => dispatch(setIsSearching(true))}
        onEndEditing={() => dispatch(setIsSearching(!!searchText))}
      />
    </Box>
  )
}
