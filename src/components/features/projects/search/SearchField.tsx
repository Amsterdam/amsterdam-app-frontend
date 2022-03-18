import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Box} from '../../../ui'
import {TextInput} from '../../../ui/forms'
import {
  selectProjectSearchText,
  setIsSearching,
  setSearchText,
} from './projectsSearchSlice'

export const SearchField = () => {
  const dispatch = useDispatch()
  const searchText = useSelector(selectProjectSearchText)

  /**
   * Updates search text if it has at least three characters, or it is empty
   */
  const dispatchValidSearchText = (text: string) => {
    if (text.length > 0 && text.length < 3) {
      return
    }

    dispatch(setSearchText(text))
  }

  return (
    <Box>
      <TextInput
        blurOnSubmit={true}
        label="Zoek in alle bouwprojecten"
        onChangeText={dispatchValidSearchText}
        onFocus={() => dispatch(setIsSearching(true))}
        onSubmitEditing={() => dispatch(setIsSearching(!!searchText))}
      />
    </Box>
  )
}
