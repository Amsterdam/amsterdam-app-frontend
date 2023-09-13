import {Ref, useMemo} from 'react'
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
  const hasStreetInput = street.length > 0
  const isBelowCharacterThreshold = street.length < addressLengthThreshold

  const content = useMemo(() => {
    if (isStreetSelected) {
      return null
    }

    if (isBelowCharacterThreshold && !hasStreetInput) {
      return <StreetSearchResultForLocation selectResult={selectResult} />
    }

    return (
      <StreetSearchResult
        bagList={bagList}
        isBelowCharacterThreshold={isBelowCharacterThreshold}
        isLoading={isLoading}
        selectResult={selectResult}
      />
    )
  }, [
    bagList,
    hasStreetInput,
    isBelowCharacterThreshold,
    isLoading,
    isStreetSelected,
    selectResult,
  ])

  return (
    <>
      <SearchField
        autoFocus={!isStreetSelected}
        onChangeText={text => {
          changeStreet(text)
        }}
        placeholder="Vul uw straatnaam of postcode in"
        ref={inputStreetRef}
        testID="AddressStreetInputSearchField"
        value={street}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        {content}
      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
