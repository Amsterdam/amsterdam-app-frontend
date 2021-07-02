import React from 'react'
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native'
import {Card, CardBody, Title} from '../ui'

type ProjectCardProps = {
  imageSource: ImageSourcePropType
  title: string
  width?: number
}

export const ProjectCard = ({imageSource, title, width}: ProjectCardProps) => (
  <View style={{width}}>
    <Card>
      <Image source={imageSource} style={styles.image} />
      <CardBody>
        <Title level={4} text={title} />
      </CardBody>
    </Card>
  </View>
)

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
