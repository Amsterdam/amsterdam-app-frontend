import Search from '@amsterdam/asc-assets/static/icons/Search.svg'
import React, {useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {Box, Button, Gutter, Text, TextInput, Title} from '../../components/ui'
import {useFetch} from '../../hooks/useFetch'
import {color, size} from '../../tokens'

type BagResponse = {
  label: string
  content: {
    _display: string
    uri: string
  }[]
  total_results: number
}

export const WasteGuideByAddress = () => {
  const [address, setAddress] = useState('')

  const response = useFetch<BagResponse[]>({
    onLoad: false,
    url: 'https://api.data.amsterdam.nl/atlas/typeahead/bag/',
  })

  return (
    <>
      <Box background="lighter">
        <Title level={2} text="Uw adres" />
        <Text>
          Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval.
        </Text>
        <Gutter height={size.spacing.md} />
        <View>
          <Text secondary>Straatnaam of postcode</Text>
          <Gutter height={size.spacing.xs} />
          <TextInput autoFocus onChangeText={text => setAddress(text)} />
        </View>
        <Gutter height={size.spacing.md} />
        <View style={styles.stretchHorizontally}>
          <Text secondary>Huisnummer en toevoeging</Text>
          <Gutter height={size.spacing.xs} />
          <View style={styles.row}>
            <TextInput onChangeText={text => text} />
            <Gutter width={size.spacing.sm} />
            <Button
              icon={<Search fill={color.font.inverse} />}
              variant="secondary"
              onPress={() => response.fetchData(`?q=${address}`)}
            />
          </View>
        </View>
      </Box>
      {response.isLoading && (
        <Box>
          <ActivityIndicator />
        </Box>
      )}
      {response.data && (
        <Box>
          {response.data
            .filter(i => i.label === 'Straatnamen')
            .map(j =>
              j.content.map(k => <Text key={k.uri}>- {k._display}</Text>),
            )}
        </Box>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  stretchHorizontally: {
    alignItems: 'stretch',
  },
})
