import React, {useEffect, useRef} from 'react'
import {
  Animated,
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput as TextInputRN,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {List} from '@/components/ui'
import {TextButton} from '@/components/ui/buttons'
import {TextInput} from '@/components/ui/forms'
import {Gutter, Row} from '@/components/ui/layout'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {useTheme} from '@/themes'
import {BagResponseContent} from '@/types'

type Props = {
  bagList: BagResponseContent | null | undefined
  changeNumber: (text: string) => void
  changeIsStreetSelected: (choice: boolean) => void
  isNumberSelected: boolean
  keyboardType: KeyboardTypeOptions | undefined
  number: string
  selectNumber: (text: string) => void
  street: string
}

const getNumberFromAddress = (text: string) => {
  return (
    text
      .split(' ')
      .reverse()
      .find(el => el.match(/^[0-9]/)) || ''
  )
}

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

  useEffect(() => {
    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      inputRef.current?.focus()
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[{marginTop: y}, styles.flex]}>
      <Row align="start">
        <TextButton
          direction="up"
          label={street}
          onPress={() => changeIsStreetSelected(false)}
        />
      </Row>
      <Gutter height="sm" />
      <TextInput
        accessibilityLabel="Vul uw huisnummer in"
        keyboardType={keyboardType}
        label="Huisnummer + toevoeging"
        onChangeText={text => changeNumber(text)}
        ref={inputRef}
        value={number}
      />
      {!isNumberSelected && number ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}>
          <List dividerBottom>
            {bagList?.map(bagItem => (
              <SuggestionButton
                key={bagItem.uri}
                label={getNumberFromAddress(bagItem._display)}
                onPress={() => {
                  selectNumber(getNumberFromAddress(bagItem._display))
                }}
              />
            ))}
          </List>
        </KeyboardAwareScrollView>
      ) : null}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
