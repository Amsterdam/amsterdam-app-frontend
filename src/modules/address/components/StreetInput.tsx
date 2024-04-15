import {Ref} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {SearchField} from '@/components/ui/forms/SearchField'
import {StreetSearchResult} from '@/modules/address/components/StreetSearchResult'
import {StreetSearchResultForLocation} from '@/modules/address/components/location/StreetSearchResultForLocation'
import {config} from '@/modules/address/config'
import {PdokAddress} from '@/modules/address/types'

type Props = {
  bagList: PdokAddress[]
  changeStreet: (text: string) => void
  inputStreetRef: Ref<TextInput>
  isLoading: boolean
  isStreetSelected: boolean
  selectResult: (item: PdokAddress) => void
  street: string
}

export const StreetInput = ({
  bagList,
  changeStreet,
  inputStreetRef,
  isLoading,
  isStreetSelected,
  selectResult,
  street,
}: Props) => {
  const {addressLengthThreshold} = config
  const isBelowCharacterThreshold = street.length < addressLengthThreshold

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.flex}>
      <SearchField
        accessibilityLabel="Zoek naar straatnaam of postcode"
        autoFocus={!isStreetSelected}
        onChangeText={text => {
          changeStreet(text)
        }}
        placeholder="Vul uw straatnaam of postcode in"
        ref={inputStreetRef}
        testID="AddressStreetInputSearchField"
        value={street}
      />
      {isStreetSelected ? null : (
        <>
          {street.length === 0 && (
            <StreetSearchResultForLocation selectResult={selectResult} />
          )}
          {!isBelowCharacterThreshold && (
            <StreetSearchResult
              bagList={bagList}
              isLoading={isLoading}
              selectResult={selectResult}
            />
          )}
        </>
      )}
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
