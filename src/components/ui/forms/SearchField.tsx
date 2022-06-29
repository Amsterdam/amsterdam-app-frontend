import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import Search from '@amsterdam/asc-assets/static/icons/Search.svg'
import React, {forwardRef, useEffect, useState} from 'react'
import {
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  View,
} from 'react-native'
import {IconButton} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable, useTheme} from '@/themes'

type Props = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
} & TextInputRNProps

export const SearchField = forwardRef<TextInputRN, Props>(
  (
    {onChangeText, onFocus, value: valueProp = '', ...otherProps}: Props,
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false)
    const [value, setValue] = useState(valueProp)

    const {color} = useTheme()
    const styles = useThemable(createStyles({hasFocus}))

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
      <View style={styles.frame}>
        {/* Both `multiline={true}` and `numberOfLines={1}` work around vertical alignment issues. */}
        {/* See https://github.com/facebook/react-native/issues/27658#issuecomment-1152902938 */}
        <TextInputRN
          {...otherProps}
          multiline={true}
          numberOfLines={1}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholderTextColor={color.text.secondary}
          ref={ref}
          style={styles.textInput}
          textAlignVertical="top"
          value={value}
        />
        {value ? (
          <IconButton
            accessibilityHint="Maak dit zoekveld leeg"
            icon={
              <Icon size={24}>
                <Close fill={color.text.default} />
              </Icon>
            }
            onPress={handleClearText}
          />
        ) : (
          <Icon size={24}>
            <Search fill={color.text.default} />
          </Icon>
        )}
      </View>
    )
  },
)

const borderWidth = (focus: boolean) => (focus ? 2 : 1)

const createStyles =
  ({hasFocus: hasFocus}: {hasFocus: boolean} & Partial<Props>) =>
  ({color, size, text}: Theme) => {
    return StyleSheet.create({
      frame: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: size.spacing.sm,
        paddingBottom:
          size.spacing.sm +
          (hasFocus ? borderWidth(false) - borderWidth(true) : 0),
        paddingHorizontal: size.spacing.md,
        backgroundColor: color.box.background.white,
        borderBottomStyle: 'solid',
        borderBottomColor: hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderBottomWidth: borderWidth(hasFocus),
      },
      textInput: {
        flex: 1,
        padding: 0, // Override an Android default
        color: color.text.default,
        fontFamily: text.fontWeight.regular,
        fontSize: text.fontSize.body,
        lineHeight: text.fontSize.body * text.lineHeight.input,
      },
    })
  }
