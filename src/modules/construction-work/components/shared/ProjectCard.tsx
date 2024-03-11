import {ReactNode, memo, useMemo} from 'react'
import {ImageSourcePropType, StyleSheet} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Gutter} from '@/components/ui/layout/Gutter'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {LogProps} from '@/processes/piwik/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  additionalAccessibilityLabel?: string
  children?: ReactNode
  imageSource?: ImageSourcePropType
  onPress: () => void
  subtitle?: string | null
  title: string
  width?: number
} & TestProps &
  LogProps

export const ProjectCard = memo(
  ({
    additionalAccessibilityLabel,
    children,
    imageSource,
    onPress,
    subtitle,
    testID,
    title,
    width,
    ...logProps
  }: Props) => {
    const createdStyles = useMemo(() => createStyles({width: width}), [width])
    const styles = useThemable(createdStyles)

    return (
      <>
        <PressableBase
          accessibilityLabel={accessibleText(
            title,
            subtitle,
            additionalAccessibilityLabel,
          )}
          accessibilityRole="button"
          onPress={onPress}
          style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
          testID={testID}
          {...logProps}>
          <AspectRatio aspectRatio="wide">
            <LazyImage
              MissingSourceFallback={ProjectWarningFallbackImage}
              source={imageSource}
              testID="ConstructionWorkProjectCardImage"
            />
          </AspectRatio>
          <Gutter height="sm" />
          {!!children && (
            <>
              {children}
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
        </PressableBase>
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
