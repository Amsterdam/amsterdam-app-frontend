import {getHeaderTitle} from '@react-navigation/elements'
import {StyleSheet, View} from 'react-native'
import {HeaderProps} from '@/components/features/header/types'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {IconSize} from '@/components/ui/types'
import {useAccessibilityAutoFocus} from '@/hooks/accessibility/useAccessibilityAutoFocus'

const chevronSize = 'ml'

export const HeaderContent = ({back, navigation, options}: HeaderProps) => {
  const title = getHeaderTitle(options, '')
  const {accessibilityLanguage, preventInitialFocus} = options

  /*
   * TODO: delete once issue https://github.com/react-navigation/react-navigation/issues/7056 is fixed
   */
  const accessibilityAutoFocusRef = useAccessibilityAutoFocus<View>({
    isActive: !preventInitialFocus,
    platform: 'ios',
  })

  return (
    <Row
      gutter="lg"
      valign="center">
      <View
        ref={accessibilityAutoFocusRef}
        style={styles.sideColumn}>
        {!!back && (
          <IconButton
            accessibilityLabel="Terug"
            hitSlop={16}
            icon={
              <Icon
                color="link"
                name="chevron-left"
                size={chevronSize}
                testID="HeaderBackIcon"
              />
            }
            onPress={back?.onPress ? back.onPress : navigation.goBack}
            testID="HeaderBackButton"
          />
        )}
      </View>
      <View style={styles.middleColumn}>
        <ScreenTitle
          accessibilityLanguage={accessibilityLanguage}
          text={title}
        />
      </View>
      <View style={styles.sideColumn} />
    </Row>
  )
}

const styles = StyleSheet.create({
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  sideColumn: {
    minWidth: IconSize[chevronSize],
  },
})
