import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {color, size} from '../../../tokens'
import {Address, ResponseAddress} from '../../../types/address'
import {Box, Gutter, Link} from '../../ui'
import {NumberInput} from './NumberInput'
import {StreetInput} from './StreetInput'

export type BagResponseContent = {
  _display: string
  uri: string
}[]

export type BagResponse = {
  label: string
  content: BagResponseContent
  total_results: number
}

export const AddressForm = () => {
  const [address, setAddress] = useState<ResponseAddress | null>(null)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const moveUpAnim = useRef(new Animated.Value(0)).current
  const [layoutY, setLayoutY] = useState<number | null>(null)

  const inputNumberRef = useRef<any>()
  const inputStreetRef = useRef<any>()

  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, layoutY ? -layoutY + size.spacing.lg : 0],
  })

  const moveUp = () => {
    Animated.timing(moveUpAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const moveDown = () => {
    resetStreet()
    inputStreetRef.current.focus()
    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

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

  const resetStreet = () => {
    setStreet('')
  }

  const RemoveWeespSuffix = (streetName: string) => {
    return streetName.replace(/ \(Weesp\)/g, '')
  }

  const selectNumber = (text: string) => {
    setNumber(text)
    setIsNumberSelected(true)
  }

  const selectStreet = (text: string) => {
    setStreet(text)
    setIsStreetSelected(true)
    moveUp()
    inputNumberRef.current.focus()
  }

  const asyncStorage = useAsyncStorage()

  const storeAddress = async (responseAddress: Address) => {
    const {
      adres,
      centroid,
      bag_huisletter,
      huisnummer,
      postcode,
      straatnaam,
      bag_toevoeging,
      woonplaats,
    } = responseAddress
    await asyncStorage.storeData('address', {
      adres,
      centroid,
      bag_huisletter,
      huisnummer,
      postcode,
      straatnaam,
      bag_toevoeging,
      woonplaats,
    })
    navigation.goBack()
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    apiBag.fetchData({q: street}) // features: 2 is needed as a param to include Weesp-addresses.
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
    address && storeAddress(address?.results[0])
  }, [address])

  return (
    <Animated.View style={[{transform: [{translateY: y}]}]}>
      <Box background="lighter" inset="lg">
        <View style={styles.streetInputWrapper}>
          <StreetInput
            bagList={bagList}
            changeStreet={changeStreet}
            inputStreetRef={inputStreetRef}
            isStreetSelected={isStreetSelected}
            selectStreet={selectStreet}
            street={street}
            styles={styles}
          />
        </View>
        <View onLayout={event => setLayoutY(event.nativeEvent.layout.y)}>
          {street ? (
            <>
              <Link direction="up" emphasis text={street} onPress={moveDown} />
              <Gutter height={size.spacing.sm} />
            </>
          ) : null}
          <NumberInput
            bagList={bagList}
            changeNumber={changeNumber}
            inputNumberRef={inputNumberRef}
            isNumberSelected={isNumberSelected}
            isStreetSelected={isStreetSelected}
            number={number}
            selectNumber={selectNumber}
            styles={styles}
          />
        </View>
      </Box>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  backToStreet: {
    flexDirection: 'row',
  },
  streetInputWrapper: {height: '100%'},
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: color.border.separator,
    borderStyle: 'solid',
  },
})
