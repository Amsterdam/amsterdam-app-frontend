import {useEffect, useRef, useState, type ReactNode} from 'react'
import {useFormContext} from 'react-hook-form'
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  type TextInput,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import type {AddressSearchFields} from '@/modules/address/screens/ChooseAddress.screen'
import type {Address, BaseAddress} from '@/modules/address/types'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/address/alerts'

import {NumberSearchField} from '@/modules/address/components/form/NumberSearchField'
import {NumberSearchResult} from '@/modules/address/components/form/NumberSearchResult'
import {StreetSearchField} from '@/modules/address/components/form/StreetSearchField'
import {StreetSearchResult} from '@/modules/address/components/form/StreetSearchResult'
import {ADDRESS_LENGTH_THRESHOLD} from '@/modules/address/constants'

import {useGetAddressSuggestionsQuery} from '@/modules/address/service'
import {addAddress} from '@/modules/address/slice'
import {addDerivedAddressFields} from '@/modules/address/utils/addDerivedAddressFields'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'
import {useTheme} from '@/themes/useTheme'

type WithAnimationProps = {
  animatedInterpolation: Animated.AnimatedInterpolation<string | number>
  children: ReactNode
}

const WithAnimation = ({
  animatedInterpolation,
  children,
}: WithAnimationProps) => (
  <>
    {!useIsReduceMotionEnabled() ? (
      <Animated.View style={[{marginTop: animatedInterpolation}, styles.flex]}>
        {children}
      </Animated.View>
    ) : (
      children
    )}
  </>
)

export const AddressForm = () => {
  const {watch, setValue} = useFormContext<AddressSearchFields>()
  const [requestNumber, setRequestNumber] = useState(false)
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const {goBack} = useNavigation()
  const previousRoute = usePreviousRoute()
  const inputRef = useRef<TextInput | null>(null)

  const {size} = useTheme()

  const windowHeight = Dimensions.get('window').height
  const moveUpAnim = useRef(new Animated.Value(1)).current
  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight + size.spacing.lg],
  })

  const street = watch('street')
  const city = watch('city')
  const number = watch('number')

  const address = `${street ?? ''} ${number ?? ''}`.trim()

  const {
    currentData: bagList,
    isFetching: isFetchingBagList,
    isError,
    refetch,
  } = useGetAddressSuggestionsQuery(
    {address, city, street: requestNumber ? street : undefined},
    {
      skip: address?.length < ADDRESS_LENGTH_THRESHOLD,
    },
  )

  const selectAddress = (selectedAddress: Address | BaseAddress) => {
    if (selectedAddress.type !== 'adres') {
      return handleIncompleteAddress(selectedAddress)
    }

    const transformedAddress = addDerivedAddressFields(selectedAddress)

    dispatch(addAddress(transformedAddress))

    if (previousRoute?.name === ModuleSlug.address) {
      setAlert(alerts.addAddressSuccess)
    }

    goBack()
  }

  const handleIncompleteAddress = (item: Address | BaseAddress) => {
    setValue('city', item.city)
    setValue('street', item.street)
    setRequestNumber(true)
  }

  useEffect(() => {
    if (!requestNumber) {
      return
    }

    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      inputRef.current?.focus()
    })
  }, [requestNumber]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!requestNumber ? (
        <>
          <StreetSearchField />

          {!!street?.length && (
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              onScrollBeginDrag={Keyboard.dismiss}
              style={styles.flex}>
              {!!bagList?.length &&
                address.length >= ADDRESS_LENGTH_THRESHOLD && (
                  <StreetSearchResult
                    bagList={bagList}
                    isError={isError}
                    isLoading={isFetchingBagList}
                    refetch={refetch}
                    selectResult={selectAddress}
                  />
                )}
            </KeyboardAwareScrollView>
          )}
        </>
      ) : (
        <WithAnimation animatedInterpolation={y}>
          <Column>
            <Row align="start">
              <Button
                accessibilityHint="klik om straatnaam te veranderen"
                accessibilityLabel={street}
                iconName="chevron-up"
                label={street}
                onPress={() => {
                  setValue('number', '')
                  setValue('city', undefined)
                  setRequestNumber(false)
                }}
                testID="AddressBackToStreetSearchButton"
                variant="tertiary"
              />
            </Row>

            <NumberSearchField ref={inputRef} />

            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              onScrollBeginDrag={Keyboard.dismiss}
              style={styles.flex}>
              {!!bagList?.length && (
                <NumberSearchResult
                  bagList={bagList}
                  isError={isError}
                  isLoading={isFetchingBagList}
                  refetch={refetch}
                  selectResult={selectAddress}
                />
              )}
            </KeyboardAwareScrollView>
          </Column>
        </WithAnimation>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
