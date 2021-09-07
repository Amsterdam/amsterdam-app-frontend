import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {color, size} from '../../../tokens'
import {Gutter, Text, TextInput} from '../../ui'
import {BagResponseContent} from './AddressForm'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeNumber: (text: string) => void
  inputNumberRef: any
  isNumberSelected: boolean
  isStreetSelected: boolean
  number: string
  selectNumber: (text: string) => void
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
  inputNumberRef,
  isNumberSelected,
  isStreetSelected,
  number,
  selectNumber,
  styles,
}: Props) => {
  return (
    <>
      <TextInput
        autoFocus={isStreetSelected}
        label="Huisnummer + toevoeging"
        onChangeText={text => changeNumber(text)}
        placeholder="Huisnummer"
        ref={inputNumberRef}
        value={number}
      />
      {isStreetSelected && !isNumberSelected && number
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
    </>
  )
}
