import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {CustomScreenOptions} from '@/app/navigation'
import {IconButton} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {selectTheme} from '@/themes'

type Props = Pick<
  StackHeaderProps,
  'back' | 'navigation' | 'options' | 'route'
> &
  CustomScreenOptions

const chevronSize = 20

export const HeaderContent = ({back, navigation, options}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)
  const title = getHeaderTitle(options, '')

  return (
    <Row gutter="lg" valign="center">
      <View style={styles.sideColumn}>
        {back && (
          <IconButton
            icon={
              <Icon size={chevronSize}>
                <ChevronLeft fill={color.pressable.default.background} />
              </Icon>
            }
            hitSlop={16}
            onPress={navigation.goBack}
          />
        )}
      </View>
      <View style={styles.middleColumn}>
        <Title
          allowFontScaling={false}
          ellipsizeMode="middle"
          level="h6"
          numberOfLines={1}
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
    minWidth: chevronSize,
  },
})
