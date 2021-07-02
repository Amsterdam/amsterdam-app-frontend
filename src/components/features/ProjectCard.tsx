import React from 'react'
import {Image, ImageSourcePropType, StyleSheet} from 'react-native'
import {Card, CardBody, Title} from '../ui'

type ProjectCardProps = {
  imageSource: ImageSourcePropType
  title: string
}

export const ProjectCard = ({imageSource, title}: ProjectCardProps) => (
  <Card>
    <Image source={imageSource} style={styles.image} />
    <CardBody>
      <Title level={4} text={title} />
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
