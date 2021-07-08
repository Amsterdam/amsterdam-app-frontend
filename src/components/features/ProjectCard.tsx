import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {Card, CardBody, Title} from '../ui'

type Props = {
  imageSource: ImageSourcePropType
  onPress: () => void
  title: string
  width?: number
}

export const ProjectCard = ({imageSource, onPress, title, width}: Props) => (
  <TouchableHighlight onPress={onPress} style={{width}}>
    <Card>
      <Image source={imageSource} style={styles.image} />
      <CardBody>
        <Title level={4} text={title} />
      </CardBody>
    </Card>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
