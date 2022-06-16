import React, {ReactElement, useMemo} from 'react'
import {ImageSourcePropType, Pressable, StyleSheet, View} from 'react-native'
import {Gutter} from '../../../../components/ui/layout'
import {Image} from '../../../../components/ui/media'
import {Paragraph, Title} from '../../../../components/ui/text'
import {Theme, useThemable} from '../../../../themes'
import {accessibleText} from '../../../../utils'

type Props = {
  imageSource?: ImageSourcePropType
  kicker?: ReactElement
  onPress: () => void
  subtitle?: string
  title: string
  width?: number
}

export const ProjectCard = ({
  imageSource,
  kicker,
  onPress,
  subtitle,
  title,
  width,
}: Props) => {
  const createdStyles = useMemo(() => createStyles({width: width}), [width])
  const styles = useThemable(createdStyles)

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibleText(
        title,
        subtitle,
        kicker?.props.accessibilityLabel,
      )}
      onPress={onPress}
      style={({pressed}) => [styles.pressable, pressed && styles.pressed]}>
      <View>
        {imageSource && (
          <>
            <Image aspectRatio="wide" source={imageSource} />
            <Gutter height="md" />
          </>
        )}
        <View>
          {kicker && (
            <>
              {kicker}
              <Gutter height="sm" />
            </>
          )}
          <Title level="h3" text={title} />
          {subtitle && <Paragraph>{subtitle}</Paragraph>}
        </View>
        {/*TODO Replace with better `Grid` gutters */}
        <Gutter height="md" />
      </View>
    </Pressable>
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
