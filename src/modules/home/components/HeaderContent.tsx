import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {ScreenTitle} from '@/components/ui/text'
import {useTheme} from '@/themes'

type Props = Pick<StackHeaderProps, 'back' | 'navigation' | 'options' | 'route'>

const chevronSize = 20

export const HeaderContent = ({back, navigation, options}: Props) => {
  const {color} = useTheme()
  const title = getHeaderTitle(options, '')

  return (
    <Row gutter="lg" valign="center">
      <View style={styles.sideColumn}>
        {!!back && (
          <IconButton
            accessibilityLabel="Terug"
            hitSlop={16}
            icon={
              <Icon scalesWithFont={false} size={chevronSize}>
                <ChevronLeft fill={color.pressable.default.background} />
              </Icon>
            }
            onPress={navigation.goBack}
          />
        )}
      </View>
      <View style={styles.middleColumn}>
        <ScreenTitle text={title} />
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
    minWidth: chevronSize,
  },
})
