import React, {useEffect, useState} from 'react'
import {useRef} from 'react'
import {TouchableOpacity} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {useFetch} from '../../hooks/useFetch'
import {size} from '../../tokens'
import {Card, Gutter, Text, TextInput} from '../ui'

type Props = {
  onFocusInput?: (focus: boolean) => void
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

export const AddressForm = ({onFocusInput, onSubmit}: Props) => {
  const [address, setAddress] = useState<any>(null)
  const [street, setStreet] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [streetSelected, setStreetSelected] = useState(false)
  const [numberSelected, setNumberSelected] = useState(false)
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const [addressFirstError, setAddressFirstError] = useState<string>('')

  const inputNumberRef = useRef<any>()
  const inputStreetRef = useRef<any>()

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

  const getNumberFromAddress = (text: string): string => {
    return text.match(/([0-9])(.*)/g)?.join('') || ''
  }

  const onChangeStreet = (text: string) => {
    setStreetSelected(false)
    setStreet(text)
    setNumber('')
  }

  const onStreetSelected = (text: string) => {
    setStreet(text)
    setStreetSelected(true)
    inputNumberRef.current.focus()
  }

  const onStreetClear = () => {
    inputStreetRef.current.clear()
    setStreet('')
  }

  const onNumberClear = () => {
    inputNumberRef.current.clear()
    setNumber('')
  }

  const onChangeNumber = (text: string) => {
    setNumberSelected(false)
    setNumber(text)
  }

  const onNumberSelected = (text: string) => {
    setNumber(text)
    setNumberSelected(true)
    inputNumberRef.current.blur()
  }

  const onStreetInputFocus = () => {
    onFocusInput && onFocusInput(true)
  }

  const onNumberInputFocus = () => {
    onFocusInput && onFocusInput(true)
    if (!streetSelected) {
      setAddressFirstError('Vul eerst uw straatnaam in a.u.b.')
      inputStreetRef.current.focus()
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    apiBag.fetchData({q: street})
    street && addressFirstError && setAddressFirstError('')
  }, [street])

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

  useEffect(() => {
    onSubmit(address?.results[0])
  }, [address])

  return (
    <Card>
      <Text secondary>Vul uw postcode of straatnaam in</Text>
      <Gutter height={size.spacing.xs} />
      <TextInput
        onChange={event => {
          onChangeStreet(event.nativeEvent.text)
        }}
        onClear={onStreetClear}
        onFocus={onStreetInputFocus}
        placeholder="Straatnaam of postcode"
        ref={inputStreetRef}
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
      <Gutter height={size.spacing.md} />
      <Text secondary>Huisnummer + toevoeging</Text>
      <Gutter height={size.spacing.xs} />
      <TextInput
        onChangeText={text => onChangeNumber(text)}
        onClear={onNumberClear}
        onFocus={onNumberInputFocus}
        placeholder="Huisnummer"
        ref={inputNumberRef}
        value={number}
      />
      {addressFirstError && !streetSelected ? (
        <Text warning>{addressFirstError}</Text>
      ) : null}
      {streetSelected && !numberSelected && (
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
    </Card>
  )
}
