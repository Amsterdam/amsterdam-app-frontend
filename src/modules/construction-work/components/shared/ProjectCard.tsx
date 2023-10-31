import {FC, memo, useMemo} from 'react'
import {ImageSourcePropType, Pressable, StyleSheet} from 'react-native'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  Kicker?: FC
  additionalAccessibilityLabel?: string
  imageSource?: ImageSourcePropType
  onPress: () => void
  subtitle?: string
  title: string
  width?: number
} & TestProps

export const ProjectCard = memo(
  ({
    additionalAccessibilityLabel,
    imageSource,
    Kicker,
    onPress,
    subtitle,
    testID,
    title,
    width,
  }: Props) => {
    const createdStyles = useMemo(() => createStyles({width: width}), [width])
    const styles = useThemable(createdStyles)

    return (
      <>
        <Pressable
          accessibilityLabel={accessibleText(
            title,
            subtitle,
            additionalAccessibilityLabel,
          )}
          accessibilityRole="button"
          onPress={onPress}
          style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
          testID={testID}>
          {!!imageSource && (
            <>
              <AspectRatio aspectRatio="wide">
                <Image
                  accessibilityIgnoresInvertColors
                  source={imageSource}
                  testID="ConstructionWorkProjectCardImage"
                />
              </AspectRatio>
              <Gutter height="sm" />
            </>
          )}
          {!!Kicker && (
            <>
              <Kicker />
              <Gutter height="xs" />
            </>
          )}
          <Title
            color="link"
            level="h4"
            testID="ConstructionWorkProjectCardTitle"
            text={title}
          />
          {!!subtitle && (
            <Paragraph testID="ConstructionWorkProjectCardSubtitle">
              {subtitle}
            </Paragraph>
          )}
          {/*TODO Replace with better `Grid` gutters */}
          <Gutter height="sm" />
        </Pressable>
        <Gutter height="sm" />
      </>
    )
  },
)

const createStyles =
  ({width}: Partial<Props>) =>
  ({color}: Theme) =>
    StyleSheet.create({
      pressable: {
        width,
        flexGrow: 1,
      },
      pressed: {
        backgroundColor: color.pressable.pressed.background,
      },
    })
