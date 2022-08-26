import React, {Ref} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {SearchField} from '@/components/ui/forms'
import {SuggestionButton} from '@/modules/address/components'
import {config} from '@/modules/address/config'
import {BagResponseContent} from '@/types'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeStreet: (text: string) => void
  inputStreetRef: Ref<TextInput>
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
  const {streetLengthThreshold} = config

  return (
    <>
      <SearchField
        autoFocus={!isStreetSelected}
        onChangeText={text => {
          changeStreet(text)
        }}
        placeholder="Vul uw straatnaam in"
        ref={inputStreetRef}
        value={street}
      />
      {!isStreetSelected && street.length >= streetLengthThreshold ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}>
          {bagList?.map(bagItem => (
            <SuggestionButton
              key={bagItem.uri}
              label={bagItem._display}
              onPress={() => {
                selectStreet(bagItem._display)
              }}
            />
          ))}
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
