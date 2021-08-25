import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {useFetch} from '../../hooks/useFetch'
import {color, size} from '../../tokens'
import {ResponseAddress} from '../../types/address'
import {Gutter, Text, TextInput} from '../ui'

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
  const [address, setAddress] = useState<ResponseAddress | null>(null)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [addressFirstError, setAddressFirstError] = useState<string>('')

  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )

  const inputNumberRef = useRef<any>()
  const inputStreetRef = useRef<any>()

  const apiAddress = useFetch<any>({
    onLoad: false,
    options: {params: {features: 2}},
    url: 'https://api.data.amsterdam.nl/atlas/search/adres/',
  })

  const apiBag = useFetch<BagResponse[]>({
    onLoad: false,
    options: {params: {features: 2}},
    url: 'https://api.data.amsterdam.nl/atlas/typeahead/bag/',
  })

  const changeNumber = (text: string) => {
    setIsNumberSelected(false)
    setNumber(text)
  }

  const changeStreet = (text: string) => {
    setIsStreetSelected(false)
    setStreet(text)
    setNumber('')
  }

  const clearNumber = () => {
    inputNumberRef.current.clear()
    setNumber('')
  }

  const clearStreet = () => {
    inputStreetRef.current.clear()
    setStreet('')
  }

  const RemoveWeespSuffix = (streetName: string) => {
    return streetName.replace(/ \(Weesp\)/g, '')
  }

  const getNumberFromAddress = (text: string) => {
    return text
      .split(' ')
      .reverse()
      .find(el => el.match(/^[0-9]/))
  }

  const handleNumberInputFocus = () => {
    onFocusInput && onFocusInput(true)
    if (!isStreetSelected) {
      setAddressFirstError('Vul eerst uw straatnaam in a.u.b.')
      inputStreetRef.current.focus()
    }
  }

  const handleStreetInputFocus = () => {
    onFocusInput && onFocusInput(true)
  }

  const selectNumber = (text: string) => {
    setNumber(text)
    setIsNumberSelected(true)
    inputNumberRef.current.blur()
  }

  const selectStreet = (text: string) => {
    setStreet(text)
    setIsStreetSelected(true)
    inputNumberRef.current.focus()
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    apiBag.fetchData({q: street}) // features: 2 is needed as a param to include Weesp-addresses.
    street && addressFirstError && setAddressFirstError('')
  }, [street])

  useEffect(() => {
    const streetWithoutWeesp = RemoveWeespSuffix(street)
    isStreetSelected && isNumberSelected
      ? apiAddress.fetchData({
          q: `${streetWithoutWeesp} ${number}`,
        })
      : apiBag.fetchData({
          q: `${streetWithoutWeesp} ${number}`,
        })
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
    <>
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
              }}
              style={styles.suggestedItem}>
              <Location width={20} height={20} fill={color.font.tertiary} />
              <Gutter width={size.spacing.xs} />
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
      {isStreetSelected && number ? (
        <FlatList
          data={bagList}
          keyExtractor={item => item.uri}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectNumber(getNumberFromAddress(item._display))
                }}
                style={styles.suggestedItem}>
                <Location width={24} height={24} fill={color.font.tertiary} />
                <Gutter width={size.spacing.xs} />
                <Text>{getNumberFromAddress(item._display)}</Text>
              </TouchableOpacity>
            )
          }}
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: color.border.separator,
    borderStyle: 'solid',
  },
})
