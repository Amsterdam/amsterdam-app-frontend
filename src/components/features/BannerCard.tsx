import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {image} from '../../tokens'
import {Card, CardBody, Text, Title} from '../ui'

type Props = {
  imageSource?: ImageSourcePropType
  onPress: () => void
  title: string
  subtitle: string
}

export const BannerCard = ({imageSource, onPress, subtitle, title}: Props) => (
  <TouchableHighlight onPress={onPress}>
    <Card>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <CardBody>
        <Title level={4} text={title} />
        <Text>{subtitle}</Text>
      </CardBody>
    </Card>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.default,
    height: undefined,
    maxWidth: '100%',
    resizeMode: 'cover',
    width: undefined,
  },
})
