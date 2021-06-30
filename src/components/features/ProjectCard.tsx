import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Text from '../ui/Text'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 256,
  },
  cardBody: {
    padding: 15,
  },
  image: {
    height: 144,
    maxWidth: '100%',
    resizeMode: 'cover',
    width: 256,
  },
})

const ProjectCard = () => (
  <View style={styles.card}>
    <Image
      source={require('../../assets/images/mock/projects/stp_marnixstraat_940.jpeg')}
      style={styles.image}
    />
    <View style={styles.cardBody}>
      <Text emphasis>Marnixstraat-Rozengracht</Text>
      <Text>Herinrichting kruispunt</Text>
    </View>
  </View>
)

export default ProjectCard
