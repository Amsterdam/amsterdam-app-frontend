import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import Title from '../ui/Title'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 224,
  },
  cardBody: {
    padding: 10,
  },
  image: {
    height: 99,
    maxWidth: '100%',
    resizeMode: 'contain',
  },
})

export const ProjectCard = () => (
  <View style={styles.card}>
    <Image
      width={224}
      height={154}
      style={styles.image}
      source={require('../../assets/images/mock/projects/stp_marnixstraat_940.jpeg')}
    />
    <View style={styles.cardBody}>
      <Title level={3}>Marnixstraat-Rozengracht</Title>
      <Text>Herinrichting kruispunt</Text>
    </View>
  </View>
)
