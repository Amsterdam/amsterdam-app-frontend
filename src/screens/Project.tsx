import {Link} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import ScreenWrapper from '../components/ui/ScreenWrapper'
import Title from '../components/ui/Title'

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 224,
  },
  cardBody: {
    padding: 10,
  },
  cardsRow: {
    flexDirection: 'row',
  },
  image: {
    height: 99,
    maxWidth: '100%',
    resizeMode: 'contain',
  },
  link: {
    color: 'navy',
    textDecorationLine: 'underline',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  screen: {
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
})

const ProjectScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <View style={styles.titleRow}>
          <Title level={2}>Centrum</Title>
          <Link to="#" style={styles.link}>
            Ga naar overzicht
          </Link>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Image
              width={224}
              height={154}
              style={styles.image}
              source={require('../assets/images/mock/projects/stp_marnixstraat_940.jpeg')}
            />
            <View style={styles.cardBody}>
              <Title level={3}>Marnixstraat-Rozengracht</Title>
              <Text>Herinrichting kruispunt</Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default ProjectScreen
