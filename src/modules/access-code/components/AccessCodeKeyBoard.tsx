import {lockAsync, OrientationLock, unlockAsync} from 'expo-screen-orientation'
import {useEffect} from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {AccessCodeKeyBoardKey} from '@/modules/access-code/components/AccessCodeKeyboardKey'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {AccessCodeType} from '@/modules/access-code/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onPressAuthenticate?: () => void
  type: AccessCodeType
}

export const AccessCodeKeyBoard = ({onPressAuthenticate, type}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useThemable(createStyles(insets))
  const {iconName, hasPermission, useBiometrics} = useAccessCodeBiometrics()
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
            <AccessCodeKeyBoardKey
              keyNumber={1}
              onPress={() => addDigit(1, type)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={2}
              onPress={() => addDigit(2, type)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={3}
              onPress={() => addDigit(3, type)}
            />
          </Row>
          <Row gutter="sm">
            <AccessCodeKeyBoardKey
              keyNumber={4}
              onPress={() => addDigit(4, type)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={5}
              onPress={() => addDigit(5, type)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={6}
              onPress={() => addDigit(6, type)}
            />
          </Row>
          <Row gutter="sm">
            <AccessCodeKeyBoardKey
              keyNumber={7}
              onPress={() => addDigit(7, type)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={8}
              onPress={() => addDigit(8, type)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={9}
              onPress={() => addDigit(9, type)}
            />
          </Row>
          <Row
            align="end"
            gutter="sm">
            {!!useBiometrics &&
              (Platform.OS === 'android' || !!hasPermission) &&
              type === AccessCodeType.codeEntered &&
              !!iconName && (
                <AccessCodeKeyBoardKey
                  accessibilityLabel="Geef toegang met biometrische gegevens"
                  iconName={iconName}
                  iconSize="lg"
                  onPress={() => {
                    onPressAuthenticate?.()
                  }}
                />
              )}
            <AccessCodeKeyBoardKey
              keyNumber={0}
              onPress={() => addDigit(0, type)}
            />
            <AccessCodeKeyBoardKey
              accessibilityLabel="Verwijder laatste cijfer"
              iconName="backspace"
              iconSize="xl"
              onPress={() => removeDigit(type)}
            />
          </Row>
        </Column>
      </Box>
    </View>
  )
}

const createStyles =
  (insets: EdgeInsets) =>
  ({border, color}: Theme) =>
    StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.customKeyboard.background,
        paddingBottom: insets.bottom,
        borderRadius: border.radius.xs,
      },
    })
