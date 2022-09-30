import React, {ReactNode} from 'react'
import {PressableProps, StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  icon: ReactNode
  text: string | ReactNode
  title: string
  titleIcon?: ReactNode
} & Omit<PressableProps, 'children'>

export const IconWithTitleButton = ({
  icon,
  text,
  title,
  titleIcon,
  onPress,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable onPress={onPress}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row gutter="md">
          <View style={styles.height}>
            <Icon size={32}>{icon}</Icon>
          </View>
          <Column>
            <Row gutter="sm" valign="center">
              <Title color="link" level="h5" text={title} />
              {!!titleIcon && <Icon size={16}>{titleIcon}</Icon>}
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
