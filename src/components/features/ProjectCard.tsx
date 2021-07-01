import React from 'react'
import {Image, ImageSourcePropType, StyleSheet} from 'react-native'
import {Card, CardBody, Text, Title} from '../ui'

type ProjectCardProps = {
  imageSource: ImageSourcePropType
  text: string
  title: string
}

export const ProjectCard = ({imageSource, text, title}: ProjectCardProps) => (
  <Card>
    <Image source={imageSource} style={styles.image} />
    <CardBody>
      <Title level={4} text={title} />
      <Text>{text}</Text>
    </CardBody>
  </Card>
)

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
    width: 300,
  },
})
