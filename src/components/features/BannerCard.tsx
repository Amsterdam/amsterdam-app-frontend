import React, {ReactElement} from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {image} from '../../tokens'
import {Card, CardBody, Text, Title} from '../ui'

type Props = {
  imageComponent?: ReactElement
  imageSource?: ImageSourcePropType
  onPress: () => void
  title: string
  subtitle: string
}

export const BannerCard = ({
  imageComponent,
  imageSource,
  onPress,
  subtitle,
  title,
}: Props) => (
  <TouchableHighlight onPress={onPress}>
    <Card>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      {imageComponent}
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
