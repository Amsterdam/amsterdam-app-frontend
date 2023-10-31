import {ReactNode, useEffect, useRef} from 'react'
import {
  Animated,
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput as TextInputRN,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button} from '@/components/ui/buttons/Button'
import {SearchField} from '@/components/ui/forms/SearchField'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'
import {NumberSearchResult} from '@/modules/address/components/NumberSearchResult'
import {PdokAddress} from '@/modules/address/types'
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

type Props = {
  bagList: PdokAddress[]
  changeIsStreetSelected: (choice: boolean) => void
  changeNumber: (text: string) => void
  isLoading: boolean

  keyboardType: KeyboardTypeOptions | undefined
  number: string
  selectResult: (item: PdokAddress) => void
  street: string
}

export const NumberInput = ({
  bagList,
  changeNumber,
  changeIsStreetSelected,
  isLoading,
  keyboardType,
  number,
  selectResult,
  street,
}: Props) => {
  const {size} = useTheme()

  const windowHeight = Dimensions.get('window').height
  const moveUpAnim = useRef(new Animated.Value(1)).current
  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight + size.spacing.lg],
  })
  const inputRef = useRef<TextInputRN | null>(null)

  useEffect(() => {
    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      inputRef.current?.focus()
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WithAnimation animatedInterpolation={y}>
      <View style={styles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}>
          <Column gutter="sm">
            <Row align="start">
              <Button
                accessibilityHint="klik om straatnaam te veranderen"
                accessibilityLabel={street}
                iconName="chevron-up"
                label={street}
                onPress={() => {
                  changeNumber('')
                  changeIsStreetSelected(false)
                }}
                testID="AddressBackToStreetSearchButton"
                variant="tertiary"
              />
            </Row>
            <SearchField
              accessibilityLabel="Zoek naar huisnummer"
              keyboardType={keyboardType}
              onChangeText={text => changeNumber(text)}
              placeholder="Vul uw huisnummer in"
              ref={inputRef}
              testID="AddressNumberInputSearchField"
              value={number}
            />
          </Column>
          <NumberSearchResult
            bagList={bagList}
            isLoading={isLoading}
            number={number}
            selectResult={selectResult}
          />
        </KeyboardAwareScrollView>
      </View>
    </WithAnimation>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
