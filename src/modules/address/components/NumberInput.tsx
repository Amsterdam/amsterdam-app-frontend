import {useEffect, useRef} from 'react'
import {
  Animated,
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput as TextInputRN,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button} from '@/components/ui/buttons'
import {SearchField} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {useIsReduceMotionEnabled} from '@/hooks'
import {Address, BagResponse} from '@/modules/address'
import {NumberSearchResult} from '@/modules/address/components'
import {useTheme} from '@/themes'

type Props = {
  bagList: BagResponse | null | undefined
  changeIsStreetSelected: (choice: boolean) => void
  changeNumber: (text: string) => void
  city: Address['woonplaats']
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

  const Wrapper = useIsReduceMotionEnabled() ? Column : Animated.View

  return (
    <Wrapper style={[{marginTop: y}, styles.flex]}>
      <Column gutter="sm">
        <Row align="start">
          <Button
            iconName="chevron-up"
            label={street}
            onPress={() => {
              changeNumber('')
              changeIsStreetSelected(false)
            }}
            variant="tertiary"
          />
        </Row>
        <SearchField
          keyboardType={keyboardType}
          onChangeText={text => changeNumber(text)}
          placeholder="Vul uw huisnummer in"
          ref={inputRef}
          testID="UserAddressNumberInputSearchField"
          value={number}
        />
      </Column>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        <NumberSearchResult {...{bagList, city, selectNumber, number}} />
      </KeyboardAwareScrollView>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
