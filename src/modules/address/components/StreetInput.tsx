import {useFocusEffect} from '@react-navigation/core'
import {Ref, useEffect} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Spinner} from '@/components/ui/feedback/Spinner'
import {SearchField} from '@/components/ui/forms/SearchField'
import {Row} from '@/components/ui/layout/Row'
import {StreetSearchResult} from '@/modules/address/components/StreetSearchResult'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'
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
  const {getCoordinates, pdokAddresses} = useGetAddressByCoordinates()
  const {
    isCheckingLocationPermission,
    hasLocationPermission,
    checkLocationPermission,
  } = useCheckLocationPermission()

  useFocusEffect(() => {
    checkLocationPermission()
  })

  useEffect(() => {
    if (hasLocationPermission) {
      void getCoordinates()
    }
  }, [getCoordinates, hasLocationPermission])

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
      {isCheckingLocationPermission ? (
        <Spinner />
      ) : (
        hasLocationPermission === false &&
        !street.length && (
          <Box insetVertical="md">
            <Row>
              <Button
                iconName="pointer"
                label="Gebruik mijn huidige locatie"
                onPress={getCoordinates} // At this point we know there is no location permission
                variant="tertiary"
              />
            </Row>
          </Box>
        )
      )}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        <StreetSearchResult
          bagList={bagList}
          isLoading={isLoading}
          isStreetSelected={isStreetSelected}
          pdokAddresses={pdokAddresses ?? []}
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
