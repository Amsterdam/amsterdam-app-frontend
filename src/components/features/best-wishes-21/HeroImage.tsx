import React from 'react'
import {StyleSheet} from 'react-native'
import {Image} from '../../ui'
import {Row} from '../../ui/layout'

export const HeroImage = () => (
  <Row>
    <Image
      source={require('../../../assets/images/best-wishes-21/kerstbanner.gif')}
      style={styles.heroImage}
    />
  </Row>
)

const styles = StyleSheet.create({
  heroImage: {
    maxWidth: '100%',
    aspectRatio: 1125 / 645,
  },
})
