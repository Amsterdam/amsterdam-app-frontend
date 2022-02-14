import React, {useEffect, useRef} from 'react'
import {Animated, Dimensions, KeyboardTypeOptions} from 'react-native'
import {size} from '../../../tokens'
import {BagResponseContent} from '../../../types'
import {TextButton} from '../../ui'
import {TextInput} from '../../ui/forms'
import {Gutter, Row, ScrollView} from '../../ui/layout'
import {SuggestionButton} from './SuggestionButton'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeNumber: (text: string) => void
  changeIsStreetSelected: (choice: boolean) => void
  isNumberSelected: boolean
  keyboardType: KeyboardTypeOptions | undefined
  number: string
  selectNumber: (text: string) => void
  street: string
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
  keyboardType,
  number,
  selectNumber,
  street,
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
      <Row align="start">
        <TextButton
          direction="up"
          text={street}
          onPress={() => changeIsStreetSelected(false)}
        />
      </Row>
      <Gutter height="sm" />
      <TextInput
        accessibilityLabel="Vul uw huisnummer in"
        autoFocus
        keyboardType={keyboardType}
        label="Huisnummer + toevoeging"
        onChangeText={text => changeNumber(text)}
        value={number}
      />
      {!isNumberSelected && number ? (
        <ScrollView grow>
          {bagList?.map(bagItem => (
            <SuggestionButton
              key={bagItem.uri}
              label={getNumberFromAddress(bagItem._display)}
              onPress={() => {
                selectNumber(getNumberFromAddress(bagItem._display))
              }}
            />
          ))}
        </ScrollView>
      ) : null}
    </Animated.View>
  )
}
