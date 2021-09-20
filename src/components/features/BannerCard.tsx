import React from 'react'
import {ImageSourcePropType, StyleSheet, TouchableHighlight} from 'react-native'
import {image} from '../../tokens'
import {Card, CardBody, Image, Title} from '../ui'

type Props = {
  border?: Boolean
  imageSource?: ImageSourcePropType
  onPress: () => void
  title: string
  subtitle: string
}

export const BannerCard = ({
  border,
  imageSource,
  onPress,
  subtitle,
  title,
}: Props) => (
  <TouchableHighlight accessibilityRole="button" onPress={onPress}>
    <Card border={border}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <CardBody>
        <Title level={3} text={title} />
        <Title level={3} subtitle text={subtitle} />
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
