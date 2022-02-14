import React from 'react'
import {BagResponseContent} from '../../../types'
import {TextInput} from '../../ui/forms'
import {ScrollView} from '../../ui/layout'
import {SuggestionButton} from './SuggestionButton'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeStreet: (text: string) => void
  inputStreetRef: any
  isStreetSelected: boolean
  selectStreet: (text: string) => void
  street: string
}

export const StreetInput = ({
  bagList,
  changeStreet,
  inputStreetRef,
  isStreetSelected,
  selectStreet,
  street,
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
            <SuggestionButton
              key={bagItem.uri}
              label={bagItem._display}
              onPress={() => {
                selectStreet(bagItem._display)
              }}
            />
          ))}
        </ScrollView>
      ) : null}
    </>
  )
}
