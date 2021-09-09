import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React, {useEffect, useRef} from 'react'
import {Animated, Dimensions, TouchableOpacity} from 'react-native'
import {color, size} from '../../../tokens'
import {Gutter, Link, Text, TextInput} from '../../ui'
import {BagResponseContent} from './AddressForm'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeNumber: (text: string) => void
  changeIsStreetSelected: (choice: boolean) => void
  isNumberSelected: boolean
  number: string
  selectNumber: (text: string) => void
  street: string
  styles: {suggestedItem: {}}
}

const getNumberFromAddress = (text: string) => {
  return (
    text
      .split(' ')
      .reverse()
      .find(el => el.match(/^[0-9]/)) || ''
  )
}

export const NumberInput = ({
  bagList,
  changeNumber,
  changeIsStreetSelected,
  isNumberSelected,
  number,
  selectNumber,
  street,
  styles,
}: Props) => {
  const windowHeight = Dimensions.get('window').height
  const moveUpAnim = useRef(new Animated.Value(1)).current
  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight + size.spacing.lg],
  })

  useEffect(() => {
    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={{marginTop: y}}>
      <Link
        direction="up"
        emphasis
        text={street}
        onPress={() => changeIsStreetSelected(false)}
      />
      <Gutter height={size.spacing.sm} />

      <TextInput
        autoFocus={true}
        label="Huisnummer + toevoeging"
        onChangeText={text => changeNumber(text)}
        placeholder="Huisnummer"
        value={number}
      />
      {!isNumberSelected && number
        ? bagList?.map(bagItem => (
            <TouchableOpacity
              key={bagItem.uri}
              onPress={() => {
                selectNumber(getNumberFromAddress(bagItem._display))
              }}
              style={styles.suggestedItem}>
              <Location width={24} height={24} fill={color.font.tertiary} />
              <Gutter width={size.spacing.xs} />
              <Text>{getNumberFromAddress(bagItem._display)}</Text>
            </TouchableOpacity>
          ))
        : null}
    </Animated.View>
  )
}
