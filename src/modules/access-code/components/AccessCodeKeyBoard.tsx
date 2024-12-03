import {lockAsync, OrientationLock, unlockAsync} from 'expo-screen-orientation'
import {useEffect} from 'react'
// eslint-disable-next-line no-restricted-imports
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  type: AccessCodeType
}

export const AccessCodeKeyBoard = ({type}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useThemable(createStyles(insets))
  const {addDigit, removeDigit} = useAccessCode()

  useEffect(() => {
    void lockAsync(OrientationLock.PORTRAIT_UP)

    return () => {
      void unlockAsync()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Box inset="sm">
        <Column gutter="sm">
          <Row gutter="sm">
            <Pressable
              onPress={() => {
                addDigit(1, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>1</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addDigit(2, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>2</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addDigit(3, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>3</Text>
            </Pressable>
          </Row>
          <Row gutter="sm">
            <Pressable
              onPress={() => {
                addDigit(4, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>4</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addDigit(5, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>5</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addDigit(6, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>6</Text>
            </Pressable>
          </Row>
          <Row gutter="sm">
            <Pressable
              onPress={() => {
                addDigit(7, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>7</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addDigit(8, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>8</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addDigit(9, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>9</Text>
            </Pressable>
          </Row>
          <Row
            align="center"
            gutter="sm">
            <Pressable style={[styles.button, styles.transparent]} />
            <Pressable
              onPress={() => {
                addDigit(0, type)
              }}
              style={styles.button}>
              <Text style={styles.text}>0</Text>
            </Pressable>
            <Pressable
              onPress={() => removeDigit(type)}
              style={[styles.button, styles.transparent]}>
              <Icon
                name="backspace"
                size="xl"
                testID="AccessCodeKeyBoardBackspace"
              />
            </Pressable>
          </Row>
        </Column>
      </Box>
    </View>
  )
}

const createStyles =
  (insets: EdgeInsets) =>
  ({border, color, text}: Theme) =>
    StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.customKeyboard.background,
        paddingBottom: insets.bottom,
        borderRadius: border.radius.xs,
      },
      button: {
        alignItems: 'center',
        backgroundColor: color.customKeyboard.button,
        justifyContent: 'center',
        width: 115,
        height: 44,
      },
      text: {
        fontSize: text.fontSize.h2,
      },
      transparent: {
        backgroundColor: 'transparent',
      },
    })
