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
import {Button} from '@/components/ui/buttons'
import {SearchField} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {useIsReduceMotionEnabled} from '@/hooks'
import {NumberSearchResult} from '@/modules/address/components'
import {Address, BagResponse} from '@/modules/address/types'
import {useTheme} from '@/themes'

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
  bagList: BagResponse | null | undefined
  changeIsStreetSelected: (choice: boolean) => void
  changeNumber: (text: string) => void
  city: Address['city']
  keyboardType: KeyboardTypeOptions | undefined
  number: string
  selectNumber: (text: string) => void
  street: string
}

export const NumberInput = ({
  bagList,
  changeNumber,
  changeIsStreetSelected,
  city,
  keyboardType,
  number,
  selectNumber,
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
        <Column gutter="sm">
          <Row align="start">
            <Button
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
            keyboardType={keyboardType}
            onChangeText={text => changeNumber(text)}
            placeholder="Vul uw huisnummer in"
            ref={inputRef}
            testID="AddressNumberInputSearchField"
            value={number}
          />
        </Column>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}>
          <NumberSearchResult {...{bagList, city, selectNumber, number}} />
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
