import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {fontFamily} from '../../tokens'
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

export const ProjectCard = () => (
  <View style={styles.card}>
    <Image
      source={require('../../assets/images/mock/projects/stp_marnixstraat_940.jpeg')}
      style={styles.image}
    />
    <View style={styles.cardBody}>
      <Text style={{fontFamily: fontFamily.demi}}>
        Marnixstraat-Rozengracht
      </Text>
      <Text>Herinrichting kruispunt</Text>
    </View>
  </View>
)
