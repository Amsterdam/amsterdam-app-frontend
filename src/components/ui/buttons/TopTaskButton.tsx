import {ReactNode} from 'react'
import {PressableProps, StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {IconName} from '@/components/ui/media/iconPaths'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type TopTaskButtonProps = {
  error?: boolean
  iconName: IconName
  text?: ReactNode
  title: string
  titleIconName?: IconName
} & Omit<PressableProps, 'children'>

export const TopTaskButton = ({
  error = false,
  iconName,
  onPress,
  text,
  title,
  titleIconName,
  testID = '',
  ...pressableProps
}: TopTaskButtonProps) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityLabel={accessibleText(
        title,
        typeof text === 'string' ? text : '',
      )}
      grow
      onPress={onPress}
      testID={testID}
      {...pressableProps}>
      <Box
        insetHorizontal="md"
        insetVertical="sm">
        <Row gutter="md">
          <View style={styles.height}>
            <Icon
              color="link"
              name={iconName}
              size="xl"
            />
          </View>
          <Column
            align="center"
            grow>
            <Row
              gutter="sm"
              valign="center">
              <Title
                color="link"
                level="h5"
                testID={`${testID}Title`}
                text={title}
              />
              {!!titleIconName && (
                <Icon
                  color="link"
                  name={titleIconName}
                />
              )}
            </Row>
            {typeof text === 'string' ? (
              <Paragraph
                color={error ? 'warning' : undefined}
                testID={`${testID}Text`}
                variant="small">
                {text}
              </Paragraph>
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
