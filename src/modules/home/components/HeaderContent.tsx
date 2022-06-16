import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {CustomScreenOptions} from '_app/navigation'
import {Row} from '_components/ui/layout'
import {Title} from '_components/ui/typography'
import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {selectTheme} from '@/themes'
import {allInsets} from '@/utils'

type Props = Pick<
  StackHeaderProps,
  'back' | 'navigation' | 'options' | 'route'
> &
  CustomScreenOptions

const chevronSize = 20

export const HeaderContent = ({back, navigation, options}: Props) => {
  const {theme} = useSelector(selectTheme)
  const title = getHeaderTitle(options, '')

  return (
    <Row gutter="lg" valign="center">
      <View style={styles.sideColumn}>
        {back && (
          <Pressable hitSlop={allInsets(16)} onPress={navigation.goBack}>
            <ChevronLeft
              width={chevronSize}
              height={chevronSize}
              fill={theme.color.pressable.default.background}
            />
          </Pressable>
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
