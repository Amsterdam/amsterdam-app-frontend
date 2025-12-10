import {Ref} from 'react'
import {Keyboard, StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Box} from '@/components/ui/containers/Box'
import {SearchField} from '@/components/ui/forms/SearchField'
import {Column} from '@/components/ui/layout/Column'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {StreetSearchResult} from '@/modules/address/components/StreetSearchResult'
import {StreetSearchResultForLocation} from '@/modules/address/components/location/StreetSearchResultForLocation'
import {config} from '@/modules/address/config'
import {BaseAddress, Address, AddressList} from '@/modules/address/types'

type Props = {
  bagList: AddressList
  changeStreet: (text: string) => void
  inputStreetRef: Ref<TextInput>
  isError: boolean
  isLoading: boolean
  isStreetSelected: boolean
  refetch: () => void
  selectResult: (item: Address | BaseAddress) => void
  street: string
}

export const StreetInput = ({
  bagList,
  changeStreet,
  inputStreetRef,
  isError,
  isLoading,
  isStreetSelected,
  refetch,
  selectResult,
  street,
}: Props) => {
  const {addressLengthThreshold} = config
  const isBelowCharacterThreshold = street.length < addressLengthThreshold

  return (
    <>
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
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        style={styles.flex}>
        {isStreetSelected ? null : (
          <>
            {street.length === 0 && (
              <Box insetTop="lg">
                <Column gutter="md">
                  <StreetSearchResultForLocation selectResult={selectResult} />
                  <RecentAddresses onPress={selectResult} />
                </Column>
              </Box>
            )}
            {!isBelowCharacterThreshold && (
              <StreetSearchResult
                bagList={bagList}
                isError={isError}
                isLoading={isLoading}
                refetch={refetch}
                selectResult={selectResult}
              />
            )}
          </>
        )}
      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
