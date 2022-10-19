import React, {ReactNode} from 'react'
import {PressableProps, StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  iconName: IconName
  text: string | ReactNode
  title: string
  titleIconName?: IconName
} & Omit<PressableProps, 'children'>

export const TopTaskButton = ({
  iconName,
  onPress,
  text,
  title,
  titleIconName,
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable onPress={onPress} {...pressableProps}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row gutter="md">
          <View style={styles.height}>
            <Icon color="link" name={iconName} size={32} />
          </View>
          <Column>
            <Row gutter="sm" valign="center">
              <Title color="link" level="h5" text={title} />
              {!!titleIconName && <Icon color="link" name={titleIconName} />}
            </Row>
            {typeof text === 'string' ? (
              <Paragraph variant="small">{text}</Paragraph>
            ) : (
              text
            )}
          </Column>
        </Row>
      </Box>
    </Pressable>
  )
}

const createStyles = ({text}: Theme) =>
  StyleSheet.create({
    height: {
      justifyContent: 'center',
      height:
        text.lineHeight.h5 * text.fontSize.h5 +
        text.lineHeight.small * text.fontSize.small,
    },
  })
