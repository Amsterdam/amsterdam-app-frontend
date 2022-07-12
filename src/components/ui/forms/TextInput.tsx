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
import {IconButton} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable, useTheme} from '@/themes'

type Props = {
  label: string
  numberOfLines?: number
  onChangeText?: (event: string) => void
  onFocus?: () => void
  warning?: boolean
} & TextInputRNProps

export const TextInput = forwardRef<TextInputRN, Props>(
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
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false)
    const [value, setValue] = useState(valueProp)

    const {color} = useTheme()
    const styles = useThemable(createStyles({hasFocus, numberOfLines, warning}))

    useEffect(() => {
      setValue(valueProp)
    }, [valueProp])

    const handleBlur = () => setHasFocus(false)

    const handleChangeText = (text: string) => {
      setValue(text)
      onChangeText?.(text)
    }

    const handleClearText = () => {
      setValue('')
      onChangeText?.('')
    }

    const handleFocus = () => {
      setHasFocus(true)
      onFocus?.()
    }

    return (
      <Column gutter="sm">
        <Label isAccessible={!otherProps.accessibilityLabel} text={label} />
        <View style={styles.frame}>
          <TextInputRN
            {...otherProps}
            numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            ref={ref}
            style={styles.textInput}
            textAlignVertical="top"
            value={value}
          />
          {value ? (
            <IconButton
              accessibilityHint="Maak dit tekstveld leeg"
              icon={
                <Icon size={24}>
                  <Close fill={color.text.default} />
                </Icon>
              }
              onPress={handleClearText}
            />
          ) : null}
        </View>
      </Column>
    )
  },
)

const borderWidth = (hasFocus: boolean, warning?: boolean) =>
  hasFocus || warning ? 2 : 1

const createStyles =
  ({hasFocus, numberOfLines, warning}: {hasFocus: boolean} & Partial<Props>) =>
  ({color, size, text}: Theme) => {
    const frameInset = size.spacing.sm
    const textLineHeight = text.fontSize.body * text.lineHeight.body

    return StyleSheet.create({
      frame: {
        flexDirection: 'row',
        padding: frameInset,
        paddingBottom:
          frameInset +
          (hasFocus
            ? borderWidth(false, warning) - borderWidth(true, warning)
            : 0),
        backgroundColor: color.box.background.white,
        borderStyle: 'solid',
        borderColor: warning
          ? color.control.warning.border
          : hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderWidth: borderWidth(hasFocus, warning),
      },
      textInput: {
        minHeight:
          Platform.OS === 'ios' && numberOfLines
            ? numberOfLines * textLineHeight + 2 * frameInset
            : 'auto',
        flex: 1,
        padding: 0, // Override an Android default
        color: color.text.default,
        fontFamily: text.fontWeight.regular,
        fontSize: text.fontSize.body,
      },
    })
  }
