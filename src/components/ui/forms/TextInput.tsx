import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {forwardRef, useEffect, useState} from 'react'
import {
  Platform,
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  View,
} from 'react-native'
import {Label} from '@/components/ui'
import {Column} from '@/components/ui//layout'
import {Pressable} from '@/components/ui/button/index'
import {Icon} from '@/components/ui/media'
import {color, font, size} from '@/tokens'

type Props = {
  label: string
  numberOfLines?: number
  onChangeText?: (event: string) => void
  onFocus?: () => void
  warning?: boolean
} & TextInputRNProps

const frameInset = size.spacing.sm
const textLineHeight = font.height.p1

export const TextInput = forwardRef(
  (
    {
      label,
      numberOfLines,
      onChangeText,
      onFocus,
      warning,
      value: valueProp = '',
      ...otherProps
    }: Props,
    ref: any,
  ) => {
    const [hasFocus, setFocus] = useState(false)
    const [value, setValue] = useState(valueProp)

    useEffect(() => {
      setValue(valueProp)
    }, [valueProp])

    const handleBlur = () => setFocus(false)

    const handleChangeText = (text: string) => {
      setValue(text)
      onChangeText && onChangeText(text)
    }

    const handleClearText = () => {
      setValue('')
      onChangeText && onChangeText('')
    }

    const handleFocus = () => {
      setFocus(true)
      onFocus && onFocus()
    }

    const dynamicStyles = StyleSheet.create({
      frame: {
        borderColor: warning
          ? color.control.warning.border
          : hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderWidth: hasFocus || warning ? 2 : 1,
      },
      textInput: {
        minHeight:
          Platform.OS === 'ios' && numberOfLines
            ? numberOfLines * textLineHeight + 2 * frameInset
            : 'auto',
      },
    })

    return (
      <Column gutter="sm">
        <Label isAccessible={!otherProps.accessibilityLabel} text={label} />
        <View style={[styles.frame, dynamicStyles.frame]}>
          <TextInputRN
            {...otherProps}
            onBlur={handleBlur}
            onChangeText={text => handleChangeText(text)}
            onFocus={handleFocus}
            numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
            ref={ref}
            style={[styles.textInput, dynamicStyles.textInput]}
            textAlignVertical="top"
            value={value}
          />
          {value ? (
            // TODO Use `IconButton` here
            <Pressable
              accessibilityRole="button"
              accessibilityHint="Verwijder uw invoertekst"
              hitSlop={size.spacing.sm}
              onPress={handleClearText}
              style={styles.clearButton}>
              <Icon size={20}>
                <Close fill={color.font.regular} />
              </Icon>
            </Pressable>
          ) : null}
        </View>
      </Column>
    )
  },
)

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: 'center',
    marginLeft: size.spacing.sm,
  },
  frame: {
    flexDirection: 'row',
    padding: frameInset,
    backgroundColor: color.background.white,
    borderStyle: 'solid',
  },
  textInput: {
    flex: 1,
    padding: 0, // Override an Android default
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: textLineHeight,
  },
})
