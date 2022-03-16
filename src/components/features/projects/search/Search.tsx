import React, {useState} from 'react'
import {Box} from '../../../ui'
import {TextInput} from '../../../ui/forms'
import {Results} from './Results'

export const Search = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  return (
    <>
      <Box>
        <TextInput
          blurOnSubmit={true}
          label="Zoek in alle bouwprojecten"
          onBlur={() => setIsSearching(false)}
          onChangeText={text => setSearchText(text)}
          onFocus={() => setIsSearching(true)}
          onSubmitEditing={() => setIsSearching(false)}
        />
      </Box>
      {isSearching && searchText.length >= 3 ? (
        <Results text={searchText} />
      ) : null}
    </>
  )
}
