import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import React, {SVGProps} from 'react'
import {StyleSheet, View} from 'react-native'
import {ChevronLeft} from '@/assets/icons'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {ScreenTitle} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = Pick<StackHeaderProps, 'back' | 'navigation' | 'options' | 'route'>

const chevronSize = 20

export const HeaderContent = ({back, navigation, options}: Props) => {
  const iconProps = useThemable(createIconProps)
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
                <ChevronLeft {...iconProps} />
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

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})

const styles = StyleSheet.create({
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  sideColumn: {
    minWidth: chevronSize,
  },
})
