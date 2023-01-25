import React, {ReactElement, useMemo} from 'react'
import {ImageSourcePropType, Pressable, StyleSheet} from 'react-native'
import {AspectRatio, Gutter} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  imageSource?: ImageSourcePropType
  kicker?: ReactElement
  onPress: () => void
  subtitle?: string
  testID?: string
  title: string
  width?: number
}

export const ProjectCard = ({
  imageSource,
  kicker,
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
        accessibilityRole="button"
        accessibilityLabel={accessibleText(
          title,
          subtitle,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          kicker?.props.accessibilityLabel ?? undefined,
        )}
        onPress={onPress}
        style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
        testID={testID}>
        {!!imageSource && (
          <>
            <AspectRatio aspectRatio="wide">
              <Image
                source={imageSource}
                testID="ConstructionWorkCardProjectImageMain"
              />
            </AspectRatio>
            <Gutter height="sm" />
          </>
        )}
        {!!kicker && (
          <>
            {kicker}
            <Gutter height="xs" />
          </>
        )}
        <Title
          color="link"
          level="h4"
          testID="ConstructionWorkCardProjectTextTitle"
          text={title}
        />
        {!!subtitle && (
          <Paragraph testID="ConstructionWorkCardProjectTextSubtitle">
            {subtitle}
          </Paragraph>
        )}
        {/*TODO Replace with better `Grid` gutters */}
        <Gutter height="sm" />
      </Pressable>
      <Gutter height="sm" />
    </>
  )
}

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
