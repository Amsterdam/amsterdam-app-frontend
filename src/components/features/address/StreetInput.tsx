import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {color, size} from '../../../tokens'
import {Gutter, Text, TextInput} from '../../ui'
import {BagResponseContent} from './AddressForm'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeStreet: (text: string) => void
  inputStreetRef: any
  isStreetSelected: boolean
  selectStreet: (text: string) => void
  street: string
  styles: {suggestedItem: {}}
}

export const StreetInput = ({
  bagList,
  changeStreet,
  inputStreetRef,
  isStreetSelected,
  selectStreet,
  street,
  styles,
}: Props) => {
  return (
    <ScrollView>
      <TextInput
        autoFocus={!isStreetSelected}
        label="Vul uw postcode of straatnaam in"
        onChangeText={text => {
          changeStreet(text)
        }}
        placeholder="Straatnaam of postcode"
        ref={inputStreetRef}
        value={street}
      />
      {!isStreetSelected
        ? bagList?.map(bagItem => (
            <TouchableOpacity
              key={bagItem.uri}
              onPress={() => {
                selectStreet(bagItem._display)
              }}
              style={styles.suggestedItem}>
              <Location width={20} height={20} fill={color.font.tertiary} />
              <Gutter width={size.spacing.xs} />
              <Text>{bagItem._display}</Text>
            </TouchableOpacity>
          ))
        : null}
    </ScrollView>
  )
}
