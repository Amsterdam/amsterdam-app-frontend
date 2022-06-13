import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import React, {useMemo} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {Row} from '../../components/ui/layout'
import {Title} from '../../components/ui/typography'
import {selectTheme, Theme, useThemable} from '../../themes'
import {allInsets} from '../../utils'
import {CustomScreenOptions} from './screenOptions'

type Props = Pick<
  StackHeaderProps,
  'back' | 'navigation' | 'options' | 'route'
> &
  CustomScreenOptions

const chevronSize = 20

export const AppHeader = ({
  back,
  navigation,
  options,
  route,
  screenType,
}: Props) => {
  const {theme} = useSelector(selectTheme)
  const {top: paddingTop = 0} = useSafeAreaInsets()
  const createdStyles = useMemo(
    () => createStyles({paddingTop, screenType}),
    [paddingTop, screenType],
  )
  const styles = useThemable(createdStyles)

  const title = getHeaderTitle(options, route.name)

  return (
    <View style={styles.appHeader}>
      <Row gutter="sm" valign="center">
        <View style={styles.sideColumnWidth}>
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
        <View style={styles.titleContainer}>
          <Title
            level="h6"
            text={title}
            ellipsizeMode="middle"
            numberOfLines={1}
          />
        </View>
        <View style={styles.sideColumnWidth} />
      </Row>
    </View>
  )
}

const createStyles =
  ({paddingTop, screenType}: CustomScreenOptions & {paddingTop: number}) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      appHeader: {
        backgroundColor: color.screen.background[screenType],
        paddingTop,
        paddingBottom: size.spacing.sm,
        paddingHorizontal: size.spacing.md,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      sideColumnWidth: {
        minWidth: chevronSize,
      },
      titleContainer: {
        flex: 1,
        alignItems: 'center',
      },
    })
