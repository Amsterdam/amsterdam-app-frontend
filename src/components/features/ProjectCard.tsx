import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Card, Text, Title} from '../ui'

export const ProjectCard = () => (
  <Card>
    <Image
      source={require('../../assets/images/mock/projects/stp_marnixstraat_940.jpeg')}
      style={styles.image}
    />
    <View style={styles.inset}>
      <Title level={4} text="Marnixstraat-Rozengracht" />
      <Text>Herinrichting kruispunt</Text>
    </View>
  </Card>
)

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
    width: 300,
  },
  inset: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
})
