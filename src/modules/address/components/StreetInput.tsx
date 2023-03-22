import {Ref} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {SearchField} from '@/components/ui/forms'
import {BagResponse} from '@/modules/address'
import {SuggestionButton} from '@/modules/address/components'
import {config} from '@/modules/address/config'

type Props = {
  bagList: BagResponse | null | undefined
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
        placeholder="Vul uw straatnaam of postcode in"
        ref={inputStreetRef}
        testID="UserAddressStreetInputSearchField"
        value={street}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        {(!isStreetSelected &&
          street.length >= streetLengthThreshold &&
          bagList?.content.map(bagItem => (
            <SuggestionButton
              key={bagItem.uri}
              label={bagItem._display}
              onPress={() => {
                selectStreet(bagItem._display)
              }}
            />
          ))) ??
          null}
      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
