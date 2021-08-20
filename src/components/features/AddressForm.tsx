import React, {useEffect, useRef, useState} from 'react'
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
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [isNumberSelected, setIsNumberSelected] = useState(false)
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

  const changeStreet = (text: string) => {
    setIsStreetSelected(false)
    setStreet(text)
    setNumber('')
  }

  const selectStreet = (text: string) => {
    setStreet(text)
    setIsStreetSelected(true)
    inputNumberRef.current.focus()
  }

  const clearStreet = () => {
    inputStreetRef.current.clear()
    setStreet('')
  }

  const clearNumber = () => {
    inputNumberRef.current.clear()
    setNumber('')
  }

  const changeNumber = (text: string) => {
    setIsNumberSelected(false)
    setNumber(text)
  }

  const selectNumber = (text: string) => {
    setNumber(text)
    setIsNumberSelected(true)
    inputNumberRef.current.blur()
  }

  const handleStreetInputFocus = () => {
    onFocusInput && onFocusInput(true)
  }

  const handleNumberInputFocus = () => {
    onFocusInput && onFocusInput(true)
    if (!isStreetSelected) {
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
    isStreetSelected && isNumberSelected
      ? apiAddress.fetchData({q: `${street} ${number}`})
      : apiBag.fetchData({q: `${street} ${number}`})
  }, [number, isNumberSelected, isStreetSelected])

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
          changeStreet(event.nativeEvent.text)
        }}
        onClear={clearStreet}
        onFocus={handleStreetInputFocus}
        placeholder="Straatnaam of postcode"
        ref={inputStreetRef}
        value={street}
      />
      {!isStreetSelected && (
        <FlatList
          data={bagList}
          keyExtractor={item => item.uri}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                selectStreet(item._display)
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
        onChangeText={text => changeNumber(text)}
        onClear={clearNumber}
        onFocus={handleNumberInputFocus}
        placeholder="Huisnummer"
        ref={inputNumberRef}
        value={number}
      />
      {addressFirstError && !isStreetSelected ? (
        <Text warning>{addressFirstError}</Text>
      ) : null}
      {isStreetSelected && !isNumberSelected && (
        <FlatList
          data={bagList}
          keyExtractor={item => item.uri}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                selectNumber(getNumberFromAddress(item._display))
              }}>
              <Text>{getNumberFromAddress(item._display)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </Card>
  )
}
