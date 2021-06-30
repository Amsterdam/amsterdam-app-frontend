import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {Card, CardBody, Text, Title} from '../ui'

export const ProjectCard = () => (
  <Card>
    <Image
      source={require('../../assets/images/mock/projects/stp_marnixstraat_940.jpeg')}
      style={styles.image}
    />
    <CardBody>
      <Title level={4} text="Marnixstraat-Rozengracht" />
      <Text>Herinrichting kruispunt</Text>
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
