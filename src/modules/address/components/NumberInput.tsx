import {useRef} from 'react'
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
import {BagResponseContent} from '@/modules/address'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {useTheme} from '@/themes'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeIsStreetSelected: (choice: boolean) => void
  changeNumber: (text: string) => void
  isNumberSelected: boolean
  keyboardType: KeyboardTypeOptions | undefined
  number: string
  selectNumber: (text: string) => void
  street: string
}

const getNumberFromAddress = (text: string) =>
  text
    .split(' ')
    .reverse()
    .find(el => el.match(/^[0-9]/)) || ''

export const NumberInput = ({
  bagList,
  changeNumber,
  changeIsStreetSelected,
  isNumberSelected,
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

  useIsReduceMotionEnabled({
    callback: isReduceMotionEnabled => {
      if (!isReduceMotionEnabled) {
        Animated.timing(moveUpAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => {
          inputRef.current?.focus()
        })
      } else {
        moveUpAnim.setValue(0)
        inputRef.current?.focus()
      }
    },
    callbackAfterAppStateChange: false,
  })

  return (
    <Animated.View style={[{marginTop: y}, styles.flex]}>
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
          testID="AddressNumberInputSearchField"
          value={number}
        />
      </Column>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        {(!isNumberSelected &&
          number.length > 0 &&
          bagList?.map(bagItem => (
            <SuggestionButton
              key={bagItem.uri}
              label={getNumberFromAddress(bagItem._display)}
              onPress={() => {
                selectNumber(getNumberFromAddress(bagItem._display))
              }}
            />
          ))) ??
          null}
      </KeyboardAwareScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
