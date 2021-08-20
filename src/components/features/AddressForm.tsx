import React, {useEffect, useState} from 'react'
import {useRef} from 'react'
import {TouchableOpacity} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {useFetch} from '../../hooks/useFetch'
import {size} from '../../tokens'
import {Card, Gutter, Text, TextInput, Title} from '../ui'

type Props = {
  onFocusInput: (focus: boolean) => void
  onSubmit: (address: any) => void
}

export type BagResponseContent = {
  _display: string
  uri: string
}[]

export type BagResponse = {
  label: string
  content: BagResponseContent
  total_results: number
}

export const AddressForm = ({onFocusInput}: Props) => {
  const [address, setAddress] = useState<any>(null)
  const [street, setStreet] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [streetSelected, setStreetSelected] = useState(false)
  const [numberSelected, setNumberSelected] = useState(false)
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )

  const inputNumberRef = useRef<any>()

  const apiBag = useFetch<BagResponse[]>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/atlas/typeahead/bag/',
  })

  const apiAddress = useFetch<any>({
    onLoad: false,
    options: {},
    url: 'https://api.data.amsterdam.nl/atlas/search/adres/',
  })

  const prohibitNumbersInStreet = (text: string) => {
    return text.replace(/[0-9]/g, '')
  }

  const getNumberFromAddress = (text: string): string => {
    return text.match(/([0-9])(.*)/g)?.join('') || ''
  }

  const onChangeStreet = (text: string) => {
    setStreetSelected(false)
    setStreet(prohibitNumbersInStreet(text))
    setNumber('')
  }

  const onStreetSelected = (text: string) => {
    setStreet(text)
    setStreetSelected(true)
    inputNumberRef.current.focus()
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    apiBag.fetchData({q: street})
  }, [street])

  const onChangeNumber = (text: string) => {
    setNumberSelected(false)
    setNumber(text)
  }

  const onNumberSelected = (text: string) => {
    setNumber(text)
    setNumberSelected(true)
    inputNumberRef.current.blur()
  }

  useEffect(() => {
    streetSelected && numberSelected
      ? apiAddress.fetchData({q: `${street} ${number}`})
      : apiBag.fetchData({q: `${street} ${number}`})
  }, [number, numberSelected, streetSelected])

  useEffect(() => {
    const suggestions = apiBag.data?.find(
      item => item.label === 'Straatnamen' || item.label === 'Adressen',
    )
    setBagList(suggestions?.content)
  }, [apiBag.data])

  useEffect(() => {
    setAddress(apiAddress.data)
  }, [apiAddress.data])

  return (
    <Card>
      <Title level={4} margin text="Vul uw adres in" />
      <TextInput
        onChangeText={text => onChangeStreet(text)}
        onFocus={() => onFocusInput(true)}
        placeholder="Straatnaam"
        value={street}
      />
      {!streetSelected && (
        <FlatList
          data={bagList}
          keyExtractor={item => item.uri}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                onStreetSelected(item._display)
              }}>
              <Text>{item._display}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Gutter height={size.spacing.sm} />
      <TextInput
        onChangeText={text => onChangeNumber(text)}
        onFocus={() => onFocusInput(true)}
        placeholder="Huisnummer"
        value={number}
        ref={inputNumberRef}
      />
      {!numberSelected && (
        <FlatList
          data={bagList}
          keyExtractor={item => item.uri}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                onNumberSelected(getNumberFromAddress(item._display))
              }}>
              <Text>{getNumberFromAddress(item._display)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Text>{address?.results[0].adres}</Text>
    </Card>
  )
}
