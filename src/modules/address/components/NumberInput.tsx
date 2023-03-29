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
import {Address, BagResponse, BagResponseContent} from '@/modules/address'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
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

const getNumberFromAddress = (text: string) =>
  text
    .split(' ')
    .reverse()
    .find(el => el.match(/^[0-9]/)) || ''

const getNumbersForCity = (addresses: BagResponseContent, city: string) =>
  addresses.filter(({_display}) =>
    city === 'Weesp' ? _display.includes('Weesp') : !_display.includes('Weesp'),
  )

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

  const numbersForCity = bagList
    ? getNumbersForCity(bagList?.content, city)
    : []

  console.log({numbersForCity, city})

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
          testID="UserAddressNumberInputSearchField"
          value={number}
        />
      </Column>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex}>
        {(number.length > 0 &&
          numbersForCity.map(bagItem => {
            console.log(bagItem._display)
            return (
              <SuggestionButton
                key={bagItem._display}
                label={getNumberFromAddress(bagItem._display)}
                onPress={() => {
                  selectNumber(getNumberFromAddress(bagItem._display))
                }}
                testID="UserAddressSuggestionButton"
              />
            )
          })) ??
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
