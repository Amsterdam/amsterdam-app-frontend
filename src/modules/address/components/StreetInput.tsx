import React, {Ref} from 'react'
import {StyleSheet, TextInput as RNTextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {List} from '@/components/ui'
import {SearchField} from '@/components/ui/forms'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {BagResponseContent} from '@/types'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeStreet: (text: string) => void
  inputStreetRef: Ref<RNTextInput>
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
      <SearchField
        autoFocus={!isStreetSelected}
        placeholder="Vul uw postcode of straatnaam in"
        onChangeText={text => {
          changeStreet(text)
        }}
        ref={inputStreetRef}
        value={street}
      />
      {!isStreetSelected && street ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}>
          <List>
            {bagList?.map(bagItem => (
              <SuggestionButton
                key={bagItem.uri}
                label={bagItem._display}
                onPress={() => {
                  selectStreet(bagItem._display)
                }}
              />
            ))}
          </List>
        </KeyboardAwareScrollView>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
