import React, {SVGProps, useEffect, useRef} from 'react'
import {
  Animated,
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput as TextInputRN,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {ChevronUp} from '@/assets/icons'
import {List} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {SearchField} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {Theme, useThemable, useTheme} from '@/themes'
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
  const iconProps = useThemable(createIconProps)

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
      <Column gutter="sm">
        <Row align="start">
          <Button
            icon={<ChevronUp {...iconProps} />}
            label={street}
            onPress={() => changeIsStreetSelected(false)}
            variant="tertiary"
          />
        </Row>
        <SearchField
          placeholder="Vul uw huisnummer in"
          keyboardType={keyboardType}
          onChangeText={text => changeNumber(text)}
          ref={inputRef}
          value={number}
        />
      </Column>
      {!isNumberSelected && number.length ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}>
          <List>
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

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
