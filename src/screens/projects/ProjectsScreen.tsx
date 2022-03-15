import React, {useState} from 'react'
import {
  NearestProjects,
  ProjectsSearchResults,
} from '../../components/features/projects'
import {Box} from '../../components/ui'
import {TextInput} from '../../components/ui/forms'

export const ProjectsScreen = () => {
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
        <ProjectsSearchResults text={searchText} />
      ) : null}
      {!isSearching && !searchText ? <NearestProjects /> : null}
    </>
  )
}
