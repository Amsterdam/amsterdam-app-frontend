import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {image} from '../../../tokens'
import {accessibleText} from '../../../utils'
import {Card, CardBody, Text, Title} from '../../ui'

type Props = {
  imageSource?: ImageSourcePropType
  onPress: () => void
  subtitle?: string
  title: string
  width?: number
}

export const ProjectCard = ({
  imageSource,
  onPress,
  subtitle,
  title,
  width,
}: Props) => (
  <TouchableHighlight
    accessibilityRole="button"
    accessibilityLabel={accessibleText(title, subtitle)}
    onPress={onPress}
    style={{width}}>
    <Card>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <CardBody>
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
