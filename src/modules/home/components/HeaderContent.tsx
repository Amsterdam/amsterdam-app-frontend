import {useFocusEffect} from '@react-navigation/core'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {StyleSheet, View} from 'react-native'
import {HeaderContentOptions} from '@/app/navigation/types'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {IconSize} from '@/components/ui/types'
import {useAccessibilityFocus} from '@/hooks/useAccessibilityFocus'

type Props = Pick<
  StackHeaderProps & {options: HeaderContentOptions},
  'back' | 'navigation' | 'options' | 'route'
>

const chevronSize = 'ml'

export const HeaderContent = ({back, navigation, options}: Props) => {
  const title = getHeaderTitle(options, '')
  const {accessibilityLanguage, preventInitialFocus} = options
  const [focusRef, setFocus] = useAccessibilityFocus()

  //TODO: delete once issue https://github.com/react-navigation/react-navigation/issues/7056 is fixed
  useFocusEffect(() => {
    if (preventInitialFocus) {
      return
    }

    setFocus()
  })

  return (
    <Row
      gutter="lg"
      valign="center">
      <View
        ref={focusRef}
        style={styles.sideColumn}>
        {!!back && (
          <IconButton
            accessibilityLabel="Terug"
            hitSlop={16}
            icon={
              <Icon
                color="link"
                name="chevron-left"
                scalesWithFont={false}
                size={chevronSize}
              />
            }
            onPress={navigation.goBack}
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
