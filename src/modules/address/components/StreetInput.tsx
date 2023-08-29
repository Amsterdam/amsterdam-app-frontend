import {Ref, useEffect} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SearchField} from '@/components/ui/forms/SearchField'
import {Row} from '@/components/ui/layout/Row'
import {StreetSearchResult} from '@/modules/address/components/StreetSearchResult'
import {useGetAddressByCoordinates} from '@/modules/address/hooks/useGetAddressByCoordinates'
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
  const {address: addressFromCoordinates, getCoordinates} =
    useGetAddressByCoordinates()

  useEffect(() => {
    addressFromCoordinates?.street &&
      changeStreet(addressFromCoordinates?.street)
  }, [addressFromCoordinates?.street, changeStreet])

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
      {!street.length && (
        <Box insetVertical="md">
          <Row>
            <Button
              iconName="pointer"
              label="Gebruik mijn huidige locatie"
              onPress={getCoordinates}
              variant="tertiary"
            />
          </Row>
        </Box>
      )}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        <StreetSearchResult
          bagList={bagList}
          isLoading={isLoading}
          isStreetSelected={isStreetSelected}
          selectResult={selectResult}
          street={street}
        />
      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
