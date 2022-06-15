import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {CustomScreenOptions} from '_app/navigation'
import {Row} from '_components/ui/layout'
import {Title} from '_components/ui/typography'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {IconButton} from '@/components/ui'
import {Icon} from '@/components/ui/media'
import {selectTheme} from '@/themes'

type Props = Pick<
  StackHeaderProps,
  'back' | 'navigation' | 'options' | 'route'
> &
  CustomScreenOptions

const chevronSize = 20

export const HeaderContent = ({back, navigation, options, route}: Props) => {
  const {theme} = useSelector(selectTheme)
  const title = getHeaderTitle(options, route.name)

  return (
    <Row gutter="sm" valign="center">
      <View style={styles.sideColumn}>
        {back && (
          <IconButton
            icon={
              <Icon size={chevronSize}>
                <ChevronLeft fill={theme.color.pressable.default.background} />
              </Icon>
            }
            hitSlop={16}
            onPress={navigation.goBack}
          />
        )}
      </View>
      <View style={styles.middleColumn}>
        <Title
          level="h6"
          text={title}
          ellipsizeMode="middle"
          numberOfLines={1}
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
