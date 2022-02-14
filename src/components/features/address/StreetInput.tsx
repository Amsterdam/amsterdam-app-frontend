import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {color} from '../../../tokens'
import {BagResponseContent} from '../../../types'
import {Text} from '../../ui'
import {TextInput} from '../../ui/forms'
import {Gutter, ScrollView} from '../../ui/layout'

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
    <>
      <TextInput
        accessibilityLabel="Vul uw postcode of straatnaam in"
        autoFocus={!isStreetSelected}
        label="Vul uw postcode of straatnaam in"
        onChangeText={text => {
          changeStreet(text)
        }}
        ref={inputStreetRef}
        value={street}
      />
      {!isStreetSelected ? (
        <ScrollView grow>
          {bagList?.map(bagItem => (
            <TouchableOpacity
              accessibilityRole="button"
              key={bagItem.uri}
              onPress={() => {
                selectStreet(bagItem._display)
              }}
              style={styles.suggestedItem}>
              <Location width={20} height={20} fill={color.font.tertiary} />
              <Gutter width="xs" />
              <Text large>{bagItem._display}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </>
  )
}
