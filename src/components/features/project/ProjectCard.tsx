import React, {ReactElement} from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from 'react-native'
import {image} from '../../../tokens'
import {accessibleText} from '../../../utils'
import {Card, CardBody, Text, Title} from '../../ui'

type Props = {
  imageSource?: ImageSourcePropType
  kicker?: ReactElement
  onPress: () => void
  style?: StyleProp<ViewStyle>
  subtitle?: string
  title: string
  width?: number
}

export const ProjectCard = ({
  imageSource,
  kicker,
  onPress,
  style,
  subtitle,
  title,
  width,
}: Props) => (
  <TouchableHighlight
    accessibilityRole="button"
    accessibilityLabel={accessibleText(
      title,
      subtitle,
      kicker?.props.accessibilityLabel,
    )}
    onPress={onPress}
    style={[style, {width}]}>
    <Card border>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <CardBody>
        {kicker}
        <Title level={4} text={title} />
        {subtitle && <Text>{subtitle}</Text>}
      </CardBody>
    </Card>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
