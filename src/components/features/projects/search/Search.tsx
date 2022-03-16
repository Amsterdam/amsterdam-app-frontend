import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Box} from '../../../ui'
import {TextInput} from '../../../ui/forms'
import {Results} from './Results'
import {selectIsProjectsSearching, setIsSearching} from './projectsSearchSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const isSearching = useSelector(selectIsProjectsSearching)
  const [searchText, setSearchText] = useState<string>('')

  return (
    <>
      <Box>
        <TextInput
          blurOnSubmit={true}
          label="Zoek in alle bouwprojecten"
          onChangeText={text => setSearchText(text)}
          onFocus={() => dispatch(setIsSearching(true))}
          onSubmitEditing={() => dispatch(setIsSearching(!!searchText.length))}
        />
      </Box>
      {isSearching && searchText.length >= 3 ? (
        <Results text={searchText} />
      ) : null}
    </>
  )
}
